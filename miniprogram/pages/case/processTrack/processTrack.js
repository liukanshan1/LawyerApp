Page({
  data: {
    tab_index: 0,
    case: null,
    // process_map_item: ['审理法院','拟定法院文书','客户盖章确认','客户盖章'],
    tree_data: [{
        id: '1',
        title: '审理法院',
        show: false,
        children: [{
            id: '1-1',
            title: '深圳市福田区人民法院',
            show: false,
            children: []
          },
          {
            id: '1-2',
            title: '法官：张三',
            show: false,
            children: []
          },
          {
            id: '1-3',
            title: '助理：李四',
            show: false,
            children: []
          },
        ]
      },
      {
        id: '2',
        title: '拟定法院文书',
        show: true,
        children: [{
          id: '2-1',
          title: '第一次：xx律所会客厅  张三，李四，王五',
          show: true,
          children: [{
              id: '2-1-1',
              title: '案情沟通笔录',
              show: true,
              children: ["案情沟通信息.docx"]
            },
            {
              id: '2-1-2',
              title: '初步方案确认',
              show: true,
              children: []
            },
          ]
        }, ]
      },
      {
        id: '3',
        title: '客户盖章确认',
        show: false,
        children: []
      },
      {
        id: '4',
        title: '第一次洽谈',
        show: false,
        children: []
      },
      {
        id: '5',
        title: '第二次洽谈',
        show: false,
        children: []
      }
    ],
    schduleList: [],
    caseId: ""
  },
  onLoad(e) {
    console.log('load', e);
    this.setData({
      tab_index: parseInt(e.tabIndex),
      caseId: e.caseId
    })
    my.showLoading();
    this.getCaseById(e.caseId)
  },
  onShow() {
    this.getCaseById(this.data.caseId)
  },
  changeTab(e) {
    this.setData({
      tab_index: e.currentTarget.dataset.i
    })
  },
  // changeTreeState(e) {
  //   let id = e.currentTarget.dataset.id
  //   let arr = id.split('-')
  //   console.log(arr);
  //   let newTreeData = this.data.tree_data
  //   let temp = newTreeData
  //   for(let i=0;i<arr.length;i++){
  //     if(i===0) temp = temp[arr[i] - 1]
  //     else temp = temp.children[arr[i] - 1]
  //   }
  //   console.log(temp);
  //   temp.show = !temp.show
  //   this.setData({
  //     tree_data: newTreeData
  //   })
  // },
  changeTreeState(e) { // 只用于一级子进程 和 大进程
    let temp = this.data.tree_data
    if (e.currentTarget.dataset.flag) {
      let index = e.currentTarget.dataset.index
      temp[index].show = !temp[index].show
    } else {
      let id = e.currentTarget.dataset.id
      let processIndex = e.currentTarget.dataset.processIndex
      temp[processIndex].children.map(item => {
        if (item._id === id) item.show = !item.show
      })
    }
    this.setData({
      tree_data: temp
    })
  },
  getCaseById(caseId) {
    console.log('caseId', caseId);
    my.cloudFunction.callFunction({
      name: "getCaseById",
      data: {
        caseId: caseId
      },
      success: (res) => {
        console.log('案件byid', res);
        this.setData({
          case: res.result.data
        })
        this.getScheduleList()
        my.cloudFunction.callFunction({
          name: "getProcessesByIds",
          data: {
            ids: this.data.case.processIds
          },
          success: (res) => {
            res.result.data.map(item => {
              item.show = false,
                item.children = []
            })
            this.setData({
              tree_data: res.result.data
            })
            let promiseArr = []
            this.data.tree_data.forEach((item, i) => {
              promiseArr.push(this.getCusProcess(item.id, i))
            })
            Promise.all(promiseArr).then(res => {
              my.hideLoading()
            })
            console.log('getProcessesByIds', res);
          },
          fail: function (res) {
            console.log('getProcessesByIds', res);
          }
        })
      },
      fail: function (res) {
        console.log('案件byid', res);
      }
    })
  },
  getCusProcess(processId, i) {
    let id = my.getStorageSync({
      key: "_id"
    }).data
    let processIndex = i
    console.log(id, this.data.case._id, processId);
    my.cloudFunction.callFunction({
      name: "getCusProcess",
      data: {
        userId: id,
        caseId: this.data.case._id,
        processId: processId
      },
      success: (res) => {
        console.log('getCusProcess', res);
        let result = res.result.data
        result.map(item => {
          item.show = false
          item.children.map(child => {
            child.show = false
          })
        })
        let temp = this.data.tree_data
        // temp[processIndex].show = true
        temp[processIndex].children = result;
        this.setData({
          tree_data: temp
        })
      },
      fail: function (res) {
        console.log('getCusProcess', res);
      }
    })
  },
  addCusProcess(e) {
    let fatherId = e.currentTarget.dataset.fatherId
    let caseId = this.data.case._id
    let processId = this.data.tree_data[e.currentTarget.dataset.i].id
    my.prompt({
      message: '新增子进程',
      placeholder: '请输入',
      okButtonText: "添加",
      cancelButtonText: '取消',
      success: (res) => {
        let input = res.inputValue
        if (input === "" || input === undefined) my.showModal({
          title: "请填写进程名称"
        });
        let id = my.getStorageSync({key: "_id"}).data
        my.cloudFunction.callFunction({
          name: "addCusProcess",
          data: {
            name: input.trim(),
            processId: processId,
            userId: id,
            fatherId: fatherId,
            caseId: caseId,
          },
          success: (res) => {
            console.log('addCusProcess', res);
            my.showLoading();
            this.getCaseById(this.data.caseId)
          },
          fail: function (res) {
            console.log('addCusProcess', res);
          }
        })
      },
      fail: (err)=>{
        console.log(err)
      }
    })
    // my.navigateTo({
    //   url: `/pages/case/addCusProcess/addCusProcess?processId=${processId}&caseId=${caseId}&fatherId=${fatherId}`
    // })
  },
  formatDate(time) {
    let date = new Date(time);
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

    return YY + '-' + MM + '-' + DD
  },
  getScheduleList() {
    let id = my.getStorageSync({
      key: '_id'
    }).data
    my.cloudFunction.callFunction({
      // name:"getSchedules",
      name: "getScheduleByCaseId",
      data: {
        // userId: id,
        // start: new Date('1970-01-01').getTime(),
        // end: new Date('2100-01-01').getTime()
        caseId: this.data.case._id
      },
      success: (res) => {
        console.log('日程', res);
        res.result.data.map(item => {
          item.time = this.formatDate(item.time)
        })
        console.log(res.result.data);
        this.setData({
          schduleList: res.result.data
        })
      },
      fail: function (res) {
        console.log('日程', res);
      }
    })
  },
});