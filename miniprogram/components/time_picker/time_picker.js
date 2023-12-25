Component({
  mixins: [],
  data: {
    selectdate:"2023-11-30",
    selecttime:"08:00"
  },
  props: {
    name:""
  },
  didMount() {
    this.setData({
      selectdate: this.initDate()
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    dateChange(e){
      // console.log(e.detail);
      this.setData({
        selectdate:e.detail.value
      })
      this.$page.setDate1(this.data.selectdate,this.props.name)
    },
    dateTime(e){
      // console.log(e.detail);
      this.setData({
        selecttime:e.detail.value
      })
      this.$page.setTime1(this.data.selecttime,this.props.name)
    },
    initDate(){
      let date = new Date();
      let YY = date.getFullYear();
      let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
      let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
      return YY + '-' + MM + '-' + DD
    },
  },
});
