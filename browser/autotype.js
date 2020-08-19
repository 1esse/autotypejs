export default class AutoType {
    constructor(dom_selector, config = {}) {
        this.task_queue = [] /** 任务队列 */
        this.type_content = '' /** 打印内容 */
        this.history_stack = [] /** 历史内容栈 */
        this._task_queue = [] /** 任务队列2-收集已执行的任务 */
        this._task_count = 0 /** 计算任务数量 */
        this.doneAction = null /** 打字完成执行动作 */
        this.config(config)
        if (typeof dom_selector === 'string')
            this.dom = document.querySelector(dom_selector)
        else
            throw TypeError('请传入正确的dom节点选择器')
    }
    config({
        cursor_typing = 'cursor_typing', /** 打字时游标的css类名 */
        cursor_stay = 'cursor_stay',   /** 停留时游标的css类名 */
        loop = false, /** 是否循环 */
        show_cursor = true, /** 是否显示游标 */
        show_end_cursor = true, /** 打字结束时是否显示游标 */
        enable_delete = false, /** 是否开启删除，如果是超长文本内容，不建议开启 */
    }) {
        this.cursor_typing = cursor_typing
        this.cursor_stay = cursor_stay
        this.loop = loop
        this.show_cursor = show_cursor
        this.show_end_cursor = show_end_cursor
        this.enable_delete = enable_delete
    }
    // 描述一段内容的展示方式
    setStage({
        media = 'text', /** 媒体类型 text-文本，image-图片 */
        text = '', /** 添加文字 */
        duration = 0, /** 该stage执行时长 */
        type = 'add', /** 类型 add-添加，delete-删除 */
        delete_count = 0, /** 删除个数，type为delete的时候提供 */
        src = '', /** 媒体类型为image时提供 */
        line_wrap = false, /** 是否换行 */
        style = '', /** 样式，接受字符串或者对象参数 */
    }) {
        if (style instanceof Object) {
            let orz = ''
            for (let [key, val] of Object.entries(style)) {
                orz += `${key}: ${val};`
            }
            style = orz
        }
        const stage = {
            media,
            text,
            duration,
            type,
            delete_count: parseInt(delete_count),
            src,
            line_wrap,
            style,
        }
        this.task_queue.push(stage)
        this._task_count++
        return this
    }
    // 执行任务
    async runTask() {
        const stage = this.task_queue.shift()
        if (!stage) throw Error('执行任务失败，空任务')
        switch (stage.type) {
            case 'add':
                // 换行
                if (stage.line_wrap) {
                    this.type_content += '<br>'
                    this._render(this.type_content)
                }
                // 增加文本
                if (stage.media === 'text') {
                    const delay = Math.floor(stage.duration / (stage.text.length || 1))
                    stage.text.length === 0 && await this._sleep(delay)
                    let stage_text = ''
                    for (const item of stage.text) {
                        await this._sleep(delay)
                        stage_text += item
                        this._render(`${this.type_content}<span style="${stage.style}">${stage_text}</span>`)
                    }
                    this.type_content += `<span style="${stage.style}">${stage.text}</span>`
                    // 增加图片
                } else if (stage.media === 'image') {
                    await this._sleep(stage.duration)
                    this.type_content += `<img style="${stage.style}" src=${stage.src} >`
                    this._render(this.type_content)
                }
                break
            case 'delete':
                if (!this.enable_delete) {
                    console.warn('删除功能未开启，如需删除，请添加配置 enable_delete: true;')
                    break
                }
                if (stage.delete_count > this.history_stack.length) stage.delete_count = this.history_stack.length
                const delay = Math.floor(stage.duration / (stage.delete_count || 1))
                stage.delete_count === 0 && await this._sleep(delay)
                for (let i = 0; i < stage.delete_count; i++) {
                    await this._sleep(delay)
                    this.history_stack.pop()
                    this.type_content = this.history_stack[this.history_stack.length - 1] || ''
                    this._render(this.type_content, false)
                }
                break
        }
        this._task_queue.push(stage)
        this.task_queue.length > 0 && this.runTask()
        if (this._task_queue.length === this._task_count) {
            this.history_stack = []
            if (this.show_cursor) {
                this.dom.classList.remove(this.cursor_typing)
                if (this.show_end_cursor) this.dom.classList.add(this.cursor_stay)
                else this.dom.classList.remove(this.cursor_stay)
            }
            if (this.loop) {
                this.type_content = ''
                this.task_queue = this._task_queue
                this._task_queue = []
                this.runTask()
            }
            this.doneAction && this.doneAction()
        }
    }

    onceDone(cb = null) {
        if (cb) this.doneAction = cb
    }

    _render(content, save_step = true) {
        if (this.show_cursor) {
            this.dom.classList.remove(this.cursor_stay)
            this.dom.classList.add(this.cursor_typing)
        }
        this.dom.innerHTML = content
        if (this.enable_delete && save_step)
            this.history_stack.push(content)
    }

    _sleep(delay) {
        if (this.show_cursor && delay >= 1000) {
            this.dom.classList.remove(this.cursor_typing)
            this.dom.classList.add(this.cursor_stay)
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, delay)
        })
    }
}
