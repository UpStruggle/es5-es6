window.addEventListener('load', function() {
    // 手机号的正则表单式
    var regp = /^(1[3]|[4]|[7]|[8])\d{9}$/;
    // qq号的正则表单式
    var regqq = /^[1-9]\d{4,}$/;
    // 昵称的正则表单式
    var reguser = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    // 短信验证码的正则表单式
    var regnote = /^[\da-zA-Z]{6}$/;
    // 密码的正则表单式
    var regpass = /^[a-zA-Z0-9_-]{6,16}$/;
    // 有多个元素要添加事件 可以封装在一个函数里面
    function verification(el, reg) {
        el.oninput = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.innerHTML = '✔ 输入的格式正确'
                    // 不能使用 classList 因为使用classList添加不会覆盖前面的类名
                    //只会在后面添加 这样输入不正确格式以后 再输入正确的格式 不正确的类会覆盖正确的 
                this.nextElementSibling.className = 'verification correct';
                // 这里不太适合使用display：block 因为会把元素转换为块级 从而影响布局
                this.nextElementSibling.style.visibility = 'visible'
                this.onblur = function() {
                    if (this.nextElementSibling.innerHTML == '✔ 输入的格式正确') {
                        this.nextElementSibling.style.visibility = 'hidden'
                    }
                }
            } else {
                switch (el) {
                    case phone:
                        this.nextElementSibling.innerHTML = '✘ 输入的格式应该为13、14、17、18开头的11位数字'
                        break;
                    case qq:
                        this.nextElementSibling.innerHTML = '✘ qq号最少是五位数字，且第一位数字大于等于1'
                        break;
                    case nickname:
                        this.nextElementSibling.innerHTML = '✘ 不包含特殊符号'
                        break;
                    case veriCode:
                        this.nextElementSibling.innerHTML = '✘ 短信验证码是6位数字'
                        break;
                    case password:
                        this.nextElementSibling.innerHTML = '✘ 由6-16位数字 字母（支持大小写） -  _  组成'
                        break;
                }
                this.nextElementSibling.className = 'verification incorrect'
                this.nextElementSibling.style.visibility = 'visible'
            }
        }
    }
    var phone = document.querySelector('.phone')
    var qq = document.querySelector('.qq')
    var nickname = document.querySelector('.nickname')
    var veriCode = document.querySelector('.veriCode')
    var password = document.querySelector('.password')
    var contrast = document.querySelector('.contrast')
    verification(phone, regp) // 手机号
    verification(qq, regqq) // qq
    verification(nickname, reguser) // 昵称
    verification(veriCode, regnote) // 短信验证码
    verification(password, regpass); // 密码
    // 确认密码的事件 
    contrast.addEventListener('input', function() {
        // 确认密码和登录密码必须一致且登录密码符合规则 提示密码设置成功
        if (this.value === password.value && 　regpass.test(password.value)) {
            this.nextElementSibling.innerHTML = '✔ 密码设置成功'
            this.nextElementSibling.className = 'verification correct'
            this.nextElementSibling.style.visibility = 'visible'
            this.onblur = function() {
                if (this.nextElementSibling.innerHTML == '✔ 密码设置成功') {
                    this.nextElementSibling.style.visibility = 'hidden'
                }
            }
        } else {
            this.nextElementSibling.innerHTML = '✘ 两次的密码不一致'
            this.nextElementSibling.className = 'verification incorrect'
            this.nextElementSibling.style.visibility = 'visible';
            // 登录密码不符合规则的时候
            if (!regpass.test(password.value)) {
                this.nextElementSibling.innerHTML = '✘ 登录密码不符合规则'
                this.nextElementSibling.className = 'verification incorrect'
            }
            // 登录密码为空的时候
            if (password.value == '') {
                this.nextElementSibling.innerHTML = '✘ 登录密码不能设置为空'
                this.nextElementSibling.className = 'verification incorrect'
            }
        }
    })
})