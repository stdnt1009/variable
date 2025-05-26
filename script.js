let numbers = [];
const min = 0;
const max = 100000;

const totalPossible = max - min + 1;

// 난수 집합(중복 방지용)
const generatedSet = new Set();

document.getElementById('container').addEventListener('click', function(event) {
    // 좌클릭만 처리
    if (event.button !== 0) return;

    if (generatedSet.size >= totalPossible) {
        showPopup('모든 난수가 생성되었습니다!');
        return;
    }

    let randomNumber;
    let attempts = 0;
    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        attempts++;
    } while (generatedSet.has(randomNumber) && attempts < 10);

    // 만약 10번 시도해도 중복이면, 남은 수 중에서 무작위 선택
    if (generatedSet.has(randomNumber)) {
        // 남은 수 배열 생성
        const remaining = [];
        for (let i = min; i <= max; i++) {
            if (!generatedSet.has(i)) remaining.push(i);
        }
        randomNumber = remaining[Math.floor(Math.random() * remaining.length)];
    }

    generatedSet.add(randomNumber);
    numbers.push(randomNumber);
    updateStats();

    const numberElem = document.createElement('div');
    numberElem.className = 'random-number';
    numberElem.textContent = randomNumber;
    numberElem.style.left = event.clientX + 'px';
    numberElem.style.top = event.clientY + 'px';

    document.getElementById('container').appendChild(numberElem);

    // 0~10이 생성되면 팝업 표시
    if (randomNumber >= 0 && randomNumber <= 10) {
        showPopup(`축하합니다! ${randomNumber}이 생성되었습니다.`);
    }
});

document.getElementById('container').addEventListener('contextmenu', function(event) {
    event.preventDefault();
    // 모든 난수 제거
    document.querySelectorAll('.random-number').forEach(elem => elem.remove());
    // 통계 및 집합 초기화
    numbers = [];
    generatedSet.clear();
    updateStats();
});

function updateStats() {
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = numbers.length ? (sum / numbers.length).toFixed(2) : 0;
    const maxVal = numbers.length ? Math.max(...numbers) : '-';
    const minVal = numbers.length ? Math.min(...numbers) : '-';
    document.getElementById('sum').textContent = sum;
    document.getElementById('avg').textContent = avg;
    document.getElementById('max').textContent = maxVal;
    document.getElementById('min').textContent = minVal;
    document.getElementById('count').textContent = numbers.length;
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 2000);
}
