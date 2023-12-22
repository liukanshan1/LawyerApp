Page({
  data: {
    tab_index: 0,
    process_map_item: ['审理法院','拟定法院文书','客户盖章确认','客户盖章'],
    tree_data: [
      {
        id: '1',
        title: '审理法院',
        show: false,
        children: [
          {
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
        children: [
          {
            id: '2-1',
            title: '第一次：xx律所会客厅  张三，李四，王五',
            show: true,
            children: [
              {
                id: '2-1-1',
                title: '案情沟通笔录',
                show: true,
                children: [ "案情沟通信息.docx"]
              },
              {
                id: '2-1-2',
                title: '初步方案确认',
                show: true,
                children: []
              },
            ]
          },
        ]
      },
      {
        id: '3',
        title: '客户盖章确认',
        show: false,
        children:[]
      },
      {
        id: '4',
        title: '第一次洽谈',
        show: false,
        children:[]
      },
      {
        id: '5',
        title: '第二次洽谈',
        show: false,
        children:[]
      }
    ]
  },
  onLoad() {},
  changeTab(e){
    this.setData({
      tab_index: e.currentTarget.dataset.i
    })
  },
  changeTreeState(e) {
    let id = e.currentTarget.dataset.id
    let arr = id.split('-')
    console.log(arr);
    let newTreeData = this.data.tree_data
    let temp = newTreeData
    for(let i=0;i<arr.length;i++){
      if(i===0) temp = temp[arr[i] - 1]
      else temp = temp.children[arr[i] - 1]
    }
    console.log(temp);
    temp.show = !temp.show
    this.setData({
      tree_data: newTreeData
    })
  }
});
