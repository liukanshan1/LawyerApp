Component({
  mixins: [],
  data: {},
  props: {
    title: String
  },
  didMount() {
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    toMessage(e){
      console.log(e, "toMessage");
      my.navigateTo({
        url: "/pages/message/message"
      })
    }
  },
});
