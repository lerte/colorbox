"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var component_1 = require('../common/component.js');

var button_1 = require('../mixins/button.js');

var open_type_1 = require('../mixins/open-type.js');

component_1.VantComponent({
  mixins: [button_1.button, open_type_1.openType],
  props: {
    show: Boolean,
    title: String,
    message: String,
    useSlot: Boolean,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    zIndex: {
      type: Number,
      value: 2000
    },
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    overlay: {
      type: Boolean,
      value: true
    },
    transition: {
      type: String,
      value: 'scale'
    }
  },
  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },
  watch: {
    show: function show(_show) {
      !_show && this.stopLoading();
    }
  },
  methods: {
    onConfirm: function onConfirm() {
      this.handleAction('confirm');
    },
    onCancel: function onCancel() {
      this.handleAction('cancel');
    },
    onClickOverlay: function onClickOverlay() {
      this.onClose('overlay');
    },
    handleAction: function handleAction(action) {
      var _a;

      if (this.data.asyncClose) {
        this.set((_a = {}, _a["loading." + action] = true, _a));
      }

      this.onClose(action);
    },
    close: function close() {
      this.set({
        show: false
      });
    },
    stopLoading: function stopLoading() {
      this.set({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },
    onClose: function onClose(action) {
      if (!this.data.asyncClose) {
        this.close();
      }

      this.$emit('close', action); // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading

      this.$emit(action, {
        dialog: this
      });
      var callback = this.data[action === 'confirm' ? 'onConfirm' : 'onCancel'];

      if (callback) {
        callback(this);
      }
    }
  }
});