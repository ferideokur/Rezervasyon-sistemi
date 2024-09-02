document.addEventListener("DOMContentLoaded", () => {
    // Tüm rezervasyonları saklamak için bir dizi
    const reservations = [];

    // Bir sonraki bölümü gösteren işlev
    const showNextSection = (sectionId) => {
        // Tüm rezervasyon formlarını gizle
        const forms = document.querySelectorAll(".reservation-form");
        forms.forEach(form => {
            form.classList.remove("active");
            form.classList.add("d-none");
        });
        // Seçilen formu göster
        document.getElementById(sectionId).classList.add("active");
        document.getElementById(sectionId).classList.remove("d-none");

        // Adım göstergesini güncelle
        const steps = document.querySelectorAll(".step");
        steps.forEach(step => step.classList.remove("active"));
        const activeStep = document.querySelector(`#step-${sectionId.split('-')[0]}`);
        if (activeStep) {
            activeStep.classList.add("active");
        }
    };

    // Adım ikonları için olay dinleyicileri
    document.getElementById("step-date").addEventListener("click", () => showNextSection("date-form"));
    document.getElementById("step-time").addEventListener("click", () => showNextSection("time-form"));
    document.getElementById("step-guests").addEventListener("click", () => showNextSection("guest-form"));
    document.getElementById("step-complete").addEventListener("click", () => showNextSection("complete-form"));

    // Devam düğmeleri için olay dinleyicileri
    document.querySelectorAll(".next-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            // Hangi formun aktif olduğunu belirlemek için formId'yi al
            const formId = event.target.closest("form").id;
            if (formId === "date-form") {
                showNextSection("time-form");
            } else if (formId === "time-form") {
                showNextSection("guest-form");
            } else if (formId === "guest-form") {
                showNextSection("complete-form");
            }
        });
    });

    // Fiyatı hesapla ve göster
    document.getElementById("guests").addEventListener("input", () => {
        const guestCount = parseInt(document.getElementById("guests").value, 10);
        const pricePerGuest = 50; // Her misafir için fiyat
        const totalPrice = guestCount * pricePerGuest;
        document.getElementById("total").value = totalPrice + " TL";
    });

    // Rezervasyonu tamamla ve listeye ekle
    document.querySelector("#complete-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const table = document.getElementById("table").value;
        const guests = document.getElementById("guests").value;
        const total = document.getElementById("total").value;

        // Aynı tarih ve saatte aynı masanın olup olmadığını kontrol et
        const isConflict = reservations.some(reservation => reservation.date === date && reservation.time === time && reservation.table === table);

        if (isConflict) {
            alert("Bu tarih ve saatte bu masa zaten rezerve edilmiş. Lütfen başka bir masa veya zaman seçin.");
            return;
        }

        // Rezervasyonu ekle
        const newReservation = {
            date,
            time,
            table,
            guests,
            total
        };
        reservations.push(newReservation);

        const reservationList = document.getElementById("reservation-list");
        const newReservationElement = document.createElement("li");
        newReservationElement.classList.add("list-group-item");
        newReservationElement.textContent = `Tarih: ${date}, Saat: ${time}, Masa: ${table}, Misafir Sayısı: ${guests}, Toplam Ücret: ${total}`;

        reservationList.appendChild(newReservationElement);

        // Formları sıfırla ve ilk forma dön
        document.querySelectorAll(".reservation-form").forEach(form => {
            form.reset();
            form.classList.remove("active");
            form.classList.add("d-none");
        });
        document.getElementById("date-form").classList.add("active");
        document.getElementById("date-form").classList.remove("d-none");

        // Adım göstergesini sıfırla
        document.querySelectorAll(".step").forEach(step => step.classList.remove("active"));
        document.getElementById("step-date").classList.add("active");
    });
});
