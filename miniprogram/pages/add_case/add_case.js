Page({
  data: {
    selectdate:"2023-11-30"
  },
  onLoad() {},
  dateChange(e){
    // console.log(e.detail);
    this.setData({
      selectdate:e.detail.value
    })
    // this.$page.setDate1(this.data.selectdate,this.props.name)
  },
});
