// อ้างอิง
const videoElement = document.getElementById('my-video');
const canvas = document.getElementById('my-canvas');

//คำสั่งในการหยิบพู่กัน 2 มิติ (สร้างตัวแปรพู่กัน)
const ctx = canvas.getContext('2d');

// สั่ง AI ตรวจจับ video จากกล้องด้วย
const predictions = await model.detect(video)

// function
async function startAI() {
    console.log('1. กำลังเปิดกล้อง...')
    await setupCamera(); // รอให้กล้องเปิด
    console.log('กล้องพร้อม');

    // ปรับขนาดให้เท่ากับ video
    canvas.width = videoElement.width;
    canvas.height = videoElement.height;

    // ตั้งค่าพู่กัน
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.font = '18px Arail'; // ตั้งค่าฟอนต์สำหรับตัวหนังสือ

    console.log('2. กำลังโหลด AI');
    // โหลด model COCO-SSD มาเตรียมไว้
    const model = await cocoSsd.load();

    detectFrame(videoElement, model)
}

async function setupCamera() {
    // 1. ขอสตรีม video จากกล้อง web cam
    const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // ดึง input อุปกรณ์

    // 2. เอาสตรีมที่ได้ ไปยัดใส่จอ video
    videoElement.srcObject = stream;

    // 3. รอ video พร้อมเล่น
    return new Promise((resolve) => {
        /* // 2. เอาสตรีมที่ได้ ไปยัดใส่จอ video
    videoElement.*/
        videoElement.onloadedmetadata = () => {
            resolve(videoElement);
        }
    })
}

// สร้าง function loop แสกน video
async function detectFrame(video, model) {
    console.log('⏳ กำลังโหลดดวงตา AI... (ขั้นตอนนี้อาจจะใช้เวลา 2-3 วินาที)');

    // ก่อนจะวาดกรอบใหม่ เราต้อง "ล้างแผ่นใส (Canvas)" ก่อน ไม่งั้นกรอบแดงจะซ้อนทับกันจนเต็มจอ
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // วาดกรอบใหม่
    predictions.forEach(item => {
        const bbox = item.bbox;
        ctx.strokeRect(bbox[0], bbox[1], bbox[2], bbox[3]);

        // ให้มันพิมพ์ชื่อบอกด้วยว่าเจออะไร!
        ctx.fillStyle = 'red';
        ctx.fillText(item.class, bbox[0], bbox[1] - 5);
    });

    // 4. สั่งให้วนลูปเรียกตัวเองซ้ำไปเรื่อยๆ!
    requestAnimationFrame(() => {
        detectFrame(video, model)
    })
}

// ดักรอ event 
// imgElement.onload = () => {
//     startAI();
// }

setupCamera(); 23