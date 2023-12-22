// component/time_picker/time_picker.js
Component({
  observers:{
    "date":function(val){
      console.log(val);
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

    date:String,
    time:String,
    
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    _date:"选择开始日期",
    _time:"00:00",
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select_date(e){
      console.log(e)
      this.setData({
        _date:e.detail.value
      })
      this.triggerEvent()
    },
    select_time(e){
      console.log(e)
      this.setData({
        _time:e.detail.value
      })
    }
    
  }
})
