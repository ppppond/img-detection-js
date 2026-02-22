// อ้างอิง
const imgElement = document.getElementById('my-image');
const canvas = document.getElementById('my-canvas');

//คำสั่งในการหยิบพู่กัน 2 มิติ
const ctx = canvas.getContext('2d');

// function
async function startAI() {
    console.log('⏳ กำลังโหลดดวงตา AI... (ขั้นตอนนี้อาจจะใช้เวลา 2-3 วินาที)');

    // โหลด model COCO-SSD มาเตรียมไว้
    const model = await cocoSsd.load();
    console.log('โหลด model สำเร็จ กำลังแสกนรูปภาพ')

    // สั่ง AI ตรวจจับรูปภาพด้วย
    const predictions = await model.detect(imgElement);
    console.log('สิ่งที่ AI มองเห็นคือ ',predictions);

    predictions.forEach(item => {
        const bbox = item.bbox; 
        ctx.strokeRect(bbox[0], bbox[1], bbox[2], bbox[3]); // วาด
    })
}

startAI();