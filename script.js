<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Калькулятор пребывания</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('images/background.png'); /* Укажите правильный путь */
            background-size: cover;
            background-attachment: fixed;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .container {
            max-width: 800px;
            margin: 50px auto;
            background: rgb(246, 248, 245);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            max-width: 150px;
        }

        h1, h2 {
            text-align: center;
            color: #141515;
        }

         .date-group, .actions, .total-days {
            margin-bottom: 20px;
        }

        .date-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .date-group input[type="date"], button {
            padding: 10px;
            font-size: 16px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        button {
            cursor: pointer;
        }

        .result-box {
            padding: 10px 15px;
            background: #47bfea;
            border: 1px solid #90caf9;
            border-radius: 4px;
            font-weight: bold;
        }

        .add-button {
            display: block;
            margin: 0 auto;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
        }

        .total-days {
            text-align: center;
            font-size: 18px;
            width: 100%;
        }

        .total-days span {
            display: inline-block;
            background: #ffc107;
            padding: 10px 20px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Логотип -->
        <div class="logo">
            <img src="images/logo.png" alt="Логотип"> <!-- Укажите правильный путь -->
        </div>

        <h1>Департамент Пограничной Службы Республики Казахстан по ЗКО</h1>
        <h2>Учебный центр "Орал"</h2>

        <!-- Расчёт даты 180 дней назад -->
        <h2>Расчёт даты 180 дней назад</h2>
        <div class="date-group">
            <label for="base-date">Укажите дату:</label>
            <input type="date" id="base-date" />
            <span id="date-result" class="result-box">Результат: -</span>
        </div>

        <!-- Калькулятор въездов/выездов -->
        <h2>Калькулятор въездов и выездов</h2>
        <div id="date-container">
            <div class="date-group">
                <input type="date" class="entry-date" placeholder="Дата въезда">
                <input type="date" class="exit-date" placeholder="Дата выезда">
                <span class="result-box">0 дней</span>
                <button class="remove" onclick="removeRow(this)">-</button>
            </div>
        </div>
        <button id="add-date" class="add-button">Добавить въезд/выезд</button>

        <!-- Общий результат -->
        <div class="total-days">
            Общее количество дней: <span id="total-days">0</span>
        </div>
    </div>

    <script>
        const baseDateInput = document.getElementById("base-date");
        const dateResult = document.getElementById("date-result");
        const dateContainer = document.getElementById("date-container");
        const totalDaysElement = document.getElementById("total-days");

        // Рассчитываем 180 дней назад
        baseDateInput.addEventListener("input", () => {
            const baseDate = new Date(baseDateInput.value);
            if (!isNaN(baseDate)) {
                const pastDate = new Date(baseDate);
                pastDate.setDate(pastDate.getDate() - 180);
                dateResult.textContent = `Результат: ${pastDate.toLocaleDateString("ru-RU")}`;
            } else {
                dateResult.textContent = "Результат: -";
            }
        });

        // Добавление новой строки въезд/выезд
        document.getElementById("add-date").addEventListener("click", () => {
            const newRow = document.createElement("div");
            newRow.classList.add("date-group");
            newRow.innerHTML = `
                <input type="date" class="entry-date" placeholder="Дата въезда">
                <input type="date" class="exit-date" placeholder="Дата выезда">
                <span class="result-box">0 дней</span>
                <button class="remove" onclick="removeRow(this)">-</button>
            `;
            dateContainer.appendChild(newRow);
        });

        // Удаление строки
        function removeRow(button) {
            dateContainer.removeChild(button.parentElement);
            calculateTotalDays(); // Пересчитать общий результат
        }

        // Автоматический расчёт для каждой строки
        dateContainer.addEventListener("input", (event) => {
            if (event.target.classList.contains("entry-date") || event.target.classList.contains("exit-date")) {
                const row = event.target.parentElement;
                const entryDate = new Date(row.querySelector(".entry-date").value);
                const exitDate = new Date(row.querySelector(".exit-date").value);
                const resultBox = row.querySelector(".result-box");

                if (!isNaN(entryDate) && !isNaN(exitDate)) {
                    const diffTime = exitDate - entryDate;
                    const days = diffTime / (1000 * 60 * 60 * 24);
                    resultBox.textContent = days > 0 ? `${days} дней` : "0 дней";
                } else {
                    resultBox.textContent = "0 дней";
                }
                calculateTotalDays(); // Пересчитать общий результат
            }
        });

        // Рассчитать общий результат
        function calculateTotalDays() {
            let totalDays = 0;

            document.querySelectorAll(".date-group").forEach(row => {
                const daysText = row.querySelector(".result-box").textContent;
                const days = parseInt(daysText.split(' ')[0]) || 0;
                totalDays += days;
            });

            document.getElementById("total-days").textContent = totalDays;
        }
    </script>
</body>
</html>
