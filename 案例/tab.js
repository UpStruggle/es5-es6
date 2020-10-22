window.addEventListener('load', function() {
    var that;
    class Tab {
        constructor(ele) {
            that = this; // 用于在事件中使用这里获取的元素
            // 获取元素
            this.box = document.querySelector(ele);
            // 如果直接用document的话 在重新用到这个类的时候 可能会出错 因为一个页面中可能用重复的类名和标签
            this.add = this.box.querySelector('.add');
            this.ul = this.box.querySelector('ul');
            this.bottom = this.box.querySelector('.bottom');
            // 1、调用初始化的方法
            this.init();
        };
        // 初始化页面 只要页面加载 就给元素添加相应的事件
        init() {
                that.updateNode();
                for (var i = 0; i < that.lis.length; i++) {
                    // 为获取的li元素对象添加一个索引号
                    that.lis[i].index = i;
                    // 2、实现切换功能
                    that.lis[i].onclick = that.toggleTab;
                    // 4、实现删除功能
                    that.delet[i].onclick = that.deleteTab;
                    // 5、实现编辑功能 ondblclick
                    that.span[i].addEventListener('dblclick', that.editTab)
                    that.ps[i].ondblclick = that.editTab;
                }
                // 、3、实现添加功能 
                that.add.addEventListener('click', that.addTab);
            }
            // 排他思想的方法
        clearClass() {
                for (var i = 0; i < that.lis.length; i++) {
                    that.lis[i].className = ''
                    that.ps[i].className = ''
                }
            }
            // 动态添加元素 需要重新获取对应的元素
        updateNode() {
                that.lis = document.querySelectorAll('li');
                that.ps = document.querySelectorAll('p');
                that.delet = document.querySelectorAll('i');
                that.span = document.querySelectorAll('span');
            }
            // 切换功能
        toggleTab() {
                that.clearClass();
                this.className = 'current';
                //此处的this指向的是lis ，所以要申请一个全局变量 that 
                that.ps[this.index].className = 'current1';
            }
            // 添加功能
        addTab() {
                var random = Math.random();
                // 添加新的内容的时候 把先前的用于选中时的li p 中的类名清除
                that.clearClass();
                //创建元素：以前的做法：动态创建元素creatElement,
                //但是元素里面内容较多，需要innerHTML赋值在appendChild追加到父元素里面
                //现在的高级做法：利用insertAdjacentHTML()可以直接把字符串格式元素添加到父元素中
                //beforeend在元素最后面追加
                //appendChild不支持追加字符串的子元素  insertAdjacentHTML支持追加字符串的子元素
                var li = `
                    <li class="current">
                        <span>新选项卡</span>
                        <i>×</i>
                    </li>`;
                var p = '<p class="current1">新内容' + random + '</p>';
                that.ul.insertAdjacentHTML('beforeend', li);
                that.bottom.insertAdjacentHTML('beforeend', p);
                // 需要重新计算li p的个数 为动态添加的元素也添加事件
                that.init();
            }
            // 删除功能
        deleteTab(e) {
                // 点击删除 会触发父级元素的事件 要阻止冒泡
                e.stopPropagation();
                // 根据父级元素的索引 用来删除
                var parentIndex = this.parentNode.index;
                that.lis[parentIndex].remove();
                that.ps[parentIndex].remove();
                // 删除了会使一些元素的数量发生变化 需要重新调用一下init
                that.init();
                if (document.querySelector('.current')) return; // 页面中有这个current类 就停止这个函数的执行 没有 就执行下面的代码
                parentIndex--;
                // 如果parentIndex为负数 就不应该执行that.lis[parentIndex].click() 所以必须lis中有和这个元素 才能给这个元素添加点击事件
                that.lis[parentIndex] && that.lis[parentIndex].click();
            }
            // 修改功能
        editTab() {
            // 先获取原先的值 然后赋值给input
            var str = this.innerHTML;
            // 双击禁止选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            // 在span里面添加一个标签
            this.innerHTML = '<input type="text">';
            var input = this.children[0]
            input.value = str;
            // input文字获取焦点后 里面的文字处于选中状态
            input.select();
            input.addEventListener('blur', function() {
                if (this.value.trim() == '') {
                    this.value = '请设置新内容';
                }
                this.parentNode.innerHTML = this.value;
            })
            input.addEventListener('keyup', function(e) {
                if (e.keyCode == 13) {
                    this.blur(); // 调用这个事件源的blur事件 执行blur事件里面的事件处理函数
                }
            })
        }
    }
    new Tab('.box');
})