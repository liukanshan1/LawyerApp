Component({
  mixins: [],
  data: {
    selectdate:"2023-11-30",
    selecttime:"12:00"
  },
  props: {
    name:""
  },
  didMount() {},
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
    }
    
  },
});
