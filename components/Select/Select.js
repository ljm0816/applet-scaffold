// components/Select/Select.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: '选择'
        },
        style: {
            type: String,
            value: ''
        },
        selectList: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        active: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toggleSelect(e) {
            this.setData({
                active: !this.data.active
            })
        },
        selected(e) {
            let item = e.currentTarget.dataset.value
            this.triggerEvent("selected", item)
            this.setData({
                active: !this.data.active
            })
        }   
    }
})
