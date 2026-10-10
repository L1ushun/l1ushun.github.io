document.addEventListener('DOMContentLoaded', function() {
    // 配置
    const recipientName = "亲爱的朋友："; // 可以修改为具体名字
    const typingSpeed = 150; // 打字速度（毫秒/字符）
    const wishesDelay = 1000; // 打字结束后开始显示祝福语的延迟（毫秒）
    const wishInterval = 800; // 每个祝福语出现的间隔（毫秒）
    
    // 背景音乐控制
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // 设置音量
    bgMusic.volume = 0.5;
    
    // 尝试强制自动播放
    function tryAutoplay() {
        // 先取消静音
        bgMusic.muted = false;
        
        // 尝试播放
        let playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // 自动播放成功
                console.log('自动播放成功');
                musicToggle.textContent = '🔊';
                musicToggle.classList.remove('muted');
            }).catch(error => {
                // 自动播放失败，设置为静音模式再试一次
                console.log('自动播放失败，尝试静音播放: ', error);
                bgMusic.muted = true;
                bgMusic.play().then(() => {
                    console.log('静音自动播放成功');
                    // 静音播放成功后，可以在用户首次交互时取消静音
                    document.addEventListener('click', function() {
                        if (bgMusic.muted) {
                            bgMusic.muted = false;
                            musicToggle.textContent = '🔊';
                            musicToggle.classList.remove('muted');
                        }
                    }, { once: true });
                }).catch(err => {
                    console.log('静音自动播放也失败: ', err);
                });
            });
        }
    }
    
    // 页面加载后立即尝试自动播放
    tryAutoplay();
    
    // 音乐播放/暂停控制
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            bgMusic.muted = false;
            musicToggle.textContent = '🔊';
            musicToggle.classList.remove('muted');
        } else {
            if (bgMusic.muted) {
                bgMusic.muted = false;
                musicToggle.textContent = '🔊';
                musicToggle.classList.remove('muted');
            } else {
                bgMusic.pause();
                musicToggle.textContent = '🔇';
                musicToggle.classList.add('muted');
            }
        }
    });
    
    // 祝福语数组
    const wishes = [
        "愿所有烦恼都消失",
        "珍情每一刻",
        "每天都要元气满满",
        "你超棒的",
        "早点休息",
        "我想你了",
        "多喝水哦~",
        "今天也要加油",
        "记得吃水果",
        "别太累啦，偶尔偷懒也好",
        "保持微笑呀",
        "愿你梦想成真",
        "愿你平安喜乐",
        "愿你所求皆所愿",
        "愿你所行化坦途",
        "愿你所遇皆温柔",
        "愿你所向披荆斩棘",
        "愿你所得皆所期",
        "愿你余生明朗清澈",
        "愿你一切安好",
        "愿你被世界温柔以待",
        "愿你眼中有光，心中有爱",
        "愿你活得轻松，笑得畅快",
        "愿你遇见更好的自己",
        "愿你的每一天都充满阳光",
        "愿你的生活如你所愿",
        "愿你前程似锦",
        "愿你岁月静好，安然无恙",
        "愿你心想事成，万事顺意",
        "愿你所到之处，皆为热土",
        "愿你所见之人，皆为挚友",
        "愿你所思之事，皆能如愿",
        "愿你所爱之人，皆能相守",
        "愿你三冬暖，愿你春不寒",
        "愿你天黑有灯，下雨有伞",
        "愿你一路上有良人相伴",
        "愿你的笑容常在",
        "愿你的快乐无忧无虑",
        "愿你如阳光般温暖",
        "愿你如月光般皎洁",
        "愿你如清风般自由",
        "愿你如细雨般温柔",
        "愿你被这个世界温柔以待",
        "愿你成为自己喜欢的样子",
        "愿你所有的努力都不被辜负",
        "愿你所有的梦想都能实现",
        "愿你所有的付出都有回报",
        "愿你所有的等待都值得",
        "愿你遇见美好，温暖如初",
        "愿你健康快乐每一天",
        "愿你所爱的人也爱你",
        "愿你的生活甜如蜜",
        "愿你的未来璀璨如星",
        "愿你笑口常开，好运连连",
        "愿你心中有爱，眼里有光",
        "愿你的付出都有回报",
        "愿你的坚持都有意义",
        "愿你的选择都不后悔",
        "愿你的道路都平坦",
        "愿你的生活充满惊喜",
        "愿你遇到的都是善良的人",
        "愿你的世界五彩斑斓",
        "愿你的心灵纯净透明",
        "愿你的理想照进现实",
        "愿你的努力皆有收获",
        "愿你的明天更加美好",
        "愿你无忧无虑，快乐永远",
        "愿你所爱之人平安喜乐",
        "愿你的生命中充满爱与希望"
    ];

    // 打字机效果
    const typingTextElement = document.getElementById('typing-text');
    let i = 0;
    
    function typeWriter() {
        if (i < recipientName.length) {
            typingTextElement.innerHTML += recipientName.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // 打字效果完成后，开始显示祝福语
            setTimeout(showWishes, wishesDelay);
        }
    }
    
    // 开始打字效果
    typeWriter();
    
    // 添加更多用户交互事件来尝试播放音乐
    ['touchstart', 'touchend', 'mousedown', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, function() {
            if (bgMusic.paused || bgMusic.muted) {
                bgMusic.muted = false;
                bgMusic.play().then(() => {
                    musicToggle.textContent = '🔊';
                    musicToggle.classList.remove('muted');
                }).catch(error => {
                    console.log(`通过${event}事件尝试播放失败: `, error);
                });
            }
        }, { once: true });
    });
    
    // 显示祝福语弹窗
    function showWishes() {
        const container = document.getElementById('wishes-container');
        let wishIndex = 0;
        
        // 设置间隔，逐个显示祝福语
        const wishesInterval = setInterval(() => {
            if (wishIndex >= wishes.length) {
                clearInterval(wishesInterval);
                return;
            }
            
            createWishCard(wishes[wishIndex], container);
            wishIndex++;
            
        }, wishInterval);
    }
    
    // 创建祝福语卡片
    function createWishCard(text, container) {
        const card = document.createElement('div');
        card.className = `wish-card color${Math.floor(Math.random() * 6) + 1}`;
        card.textContent = text;
        
        // 随机位置
        const left = Math.random() * 70 + 5; // 5% - 75%
        const top = Math.random() * 70 + 5;  // 5% - 75%
        
        card.style.left = `${left}%`;
        card.style.top = `${top}%`;
        
        // 添加到容器
        container.appendChild(card);
    }
});
