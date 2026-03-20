fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("cardContainer");

    data.items.forEach(item => {
      // สร้าง card
      const card = document.createElement("div");
      card.className = "card";

      // สร้าง img
      const img = document.createElement("img");
      img.src = item.imgsrcurl;

      // สร้าง h3
      const title = document.createElement("h3");
      title.textContent = item.name;

      // เอา img + title ใส่ card
      card.appendChild(img);
      card.appendChild(title);

      // เอา card ใส่ container
      container.appendChild(card);
    });
  });
