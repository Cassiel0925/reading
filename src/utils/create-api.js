import CreateAPI from "vue-create-api";
import Vue from 'vue'
import Popup from 'components/common/popup/Popup'
import ShelfGroupDialog from 'views/shelf/childComps/ShelfGroupDialog'
import Toast from 'components/common/toast/Toast'

Vue.use(CreateAPI)
Vue.createAPI(Popup, true)
Vue.createAPI(ShelfGroupDialog, true)
Vue.createAPI(Toast, true)

Vue.mixin({
    methods: {
        popup(settings) {
            return this.$createPopup({
                $props: settings
            })
        },
        dialog(settings) {
            return this.$createShelfGroupDialog({
                $props: settings
            })
        },
        toast(settings) {
            return this.$createToast({
                $props: settings
            })
        },
        simpleToast(text) {
            const toast = this.toast({
                text: text
            })
            toast.show()
            toast.updateText(text)
        },
    }
})