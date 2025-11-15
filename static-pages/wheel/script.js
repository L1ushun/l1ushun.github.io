document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const optionsTextarea = document.getElementById('options');
    
    let options = ['选项1', '选项2', '选项3', '选项4', '选项5'];
    let isSpinning = false;
    let currentRotation = 0;
    let spinTimeout = null;
    
    // 初始化默认选项
    optionsTextarea.value = options.join('\n');
    
    // 绘制转盘
    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        // 绘制转盘背景
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#f8f9fa';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
        
        // 获取当前选项
        const currentOptions = optionsTextarea.value.split('\n').filter(option => option.trim() !== '');
        if (currentOptions.length === 0) {
            currentOptions.push('请添加选项');
        }
        options = currentOptions;
        
        // 绘制扇形区域
        const sliceAngle = 2 * Math.PI / options.length;
        const colors = generateColors(options.length);
        
        // 指针位置在顶部中心
        
        for (let i = 0; i < options.length; i++) {
            // 计算每个扇区的起始角度
            // 注意：Canvas的角度是从右侧开始，逆时针方向
            // 我们希望第一个选项在顶部（270度，或-90度，或3π/2）
            const startAngle = currentRotation + (-Math.PI / 2) + (i * sliceAngle);
            const endAngle = startAngle + sliceAngle;
            
            // 绘制扇形
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            
            // 绘制文字
            // 计算文字位置（在扇区中间）
            const textAngle = startAngle + (sliceAngle / 2);
            const textRadius = radius * 0.75; // 文字距离中心的距离
            const textX = centerX + Math.cos(textAngle) * textRadius;
            const textY = centerY + Math.sin(textAngle) * textRadius;
            
            // 保存当前状态
            ctx.translate(textX, textY);
            ctx.rotate(textAngle + Math.PI / 2); // 旋转文字使其沿着半径方向
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';
            ctx.font = 'bold 18px Arial';
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 3;
            
            // 计算文本最大宽度
            const maxTextWidth = radius * 0.7;
            let text = options[i];
            
            // 如果文本太长，截断并添加省略号
            if (ctx.measureText(text).width > maxTextWidth) {
                let truncatedText = text;
                while (ctx.measureText(truncatedText + '...').width > maxTextWidth && truncatedText.length > 0) {
                    truncatedText = truncatedText.slice(0, -1);
                }
                text = truncatedText + (truncatedText.length < options[i].length ? '...' : '');
            }
            
            ctx.fillText(text, 0, 0);
            
            // 重置阴影效果
            ctx.shadowBlur = 0;
            
            ctx.restore();
        }
    }
    
    // 生成不同的颜色
    function generateColors(count) {
        const colors = [];
        const baseHues = [0, 60, 120, 180, 240, 300]; // 基础色调：红、黄、绿、青、蓝、紫
        
        for (let i = 0; i < count; i++) {
            const hue = baseHues[i % baseHues.length];
            const lightness = 85 - (i % 3) * 10; // 交替的亮度
            colors.push(`hsl(${hue}, 70%, ${lightness}%)`);
        }
        
        return colors;
    }
    
    // 开始旋转
    function startSpin() {
        if (isSpinning) return;
        
        // 获取当前选项
        const currentOptions = optionsTextarea.value.split('\n').filter(option => option.trim() !== '');
        if (currentOptions.length === 0) {
            alert('请先添加选项');
            return;
        }
        
        options = currentOptions;
        isSpinning = true;
        
        // 随机旋转角度 (5-10圈)
        const spinAngle = 5 * 2 * Math.PI + Math.random() * 5 * 2 * Math.PI;
        const spinTime = 5000; // 旋转时间5秒
        const spinStartTime = Date.now();
        
        // 清除之前的定时器
        if (spinTimeout) {
            clearTimeout(spinTimeout);
        }
        
        // 旋转动画
        function rotateWheel() {
            const currentTime = Date.now();
            const elapsed = currentTime - spinStartTime;
            
            if (elapsed < spinTime) {
                // 使用缓动函数使旋转逐渐减速
                const easeOut = function(t) {
                    return 1 - Math.pow(1 - t, 3);
                };
                
                const progress = elapsed / spinTime;
                const easedProgress = easeOut(progress);
                currentRotation = spinAngle * easedProgress;
                
                drawWheel();
                spinTimeout = setTimeout(rotateWheel, 16); // 约60fps
            } else {
                // 旋转结束
                currentRotation = spinAngle % (2 * Math.PI);
                drawWheel();
                isSpinning = false;
            }
        }
        
        rotateWheel();
    }
    
    
    // 重置转盘
    function resetWheel() {
        isSpinning = false;
        currentRotation = 0;
        if (spinTimeout) {
            clearTimeout(spinTimeout);
        }
        drawWheel();
    }
    
    // 事件监听器
    startBtn.addEventListener('click', startSpin);
    resetBtn.addEventListener('click', resetWheel);
    optionsTextarea.addEventListener('input', drawWheel);
    
    // 初始绘制
    drawWheel();
});
