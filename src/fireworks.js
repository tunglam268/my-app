import React, { useEffect } from "react";
import anime from "animejs";
import "./fireworks.css";

const sunsetColors = [
    "#ff7e5f", "#feb47b", "#ff6a88", "#ff758c", "#fd5e53", "#fc5c65",
    "#fa8072", "#fc6278", "#ff5e5b", "#ff4500"
];

const neonColors = [
    "#ff073a", "#ffdd00", "#39ff14", "#0dffea", "#ff5e7e", "#ff3f8b",
    "#adff2f", "#ff8c00", "#ff00ff", "#7cfc00"
];

const brightColors = [
    "#ff5733", "#ffbd33", "#75ff33", "#33ff57", "#33ffbd", "#3375ff",
    "#7533ff", "#bd33ff", "#ff33bd", "#ff3375"
];


const colors = [
    ...sunsetColors,...neonColors,...brightColors
];


const Fireworks = () => {
    // Hàm tạo pháo hoa tại vị trí (x, y)
    const createFirework = (x, y) => {
        const launchHeight = Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
        const projectile = document.createElement("div");
        projectile.classList.add("projectile");
        document.body.appendChild(projectile);

        projectile.style.left = `${x}px`;
        projectile.style.top = `${y}px`;

        anime({
            targets: projectile,
            translateY: -launchHeight,
            duration: 1200,
            easing: "easeOutQuad",
            complete: () => {
                const burstY = y - launchHeight;
                projectile.remove();
                createBurst(x, burstY);
            },
        });
    };

    // Hàm tạo hiệu ứng chữ "I LOVE YOU"
    const createBurst = (x, y) => {
        const texts = ["Tùng Lâm ❤ Ngọc Mai", "Chúc mừng 3 năm bên nhau ❤", "Anh yêu em nhiều ❤", "Mãi bên anh em nhé !"]; // Mảng các từ cần hiển thị
        const letters = texts[Math.floor(Math.random() * texts.length)];
        const letterSpacing = 25; // Khoảng cách giữa các chữ cái
        const startX = x - (letters.length * letterSpacing) / 2; // Căn giữa

        // Tạo từng chữ cái
        for (let i = 0; i < letters.length; i++) {
            createFixedLetter(startX + i * letterSpacing, y, letters[i]);
        }

        // Tạo các hạt sparkles
        const numSparkles = 50;
        for (let i = 0; i < numSparkles; i++) {
            createParticle(x, y, true);
        }
    };

    // Hàm tạo chữ cái cố định
    const createFixedLetter = (x, y, letter) => {
        const el = document.createElement("div");
        el.classList.add("particle");
        el.textContent = letter;
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        el.style.position = "absolute";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = "translate(-50%, -50%)";

        document.body.appendChild(el);

        anime({
            targets: el,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1200,
            easing: "easeOutCubic",
            complete: () => {
                anime({
                    targets: el,
                    opacity: [1, 0],
                    duration: 800,
                    easing: "easeInCubic",
                    complete: () => el.remove(),
                });
            },
        });
    };

    // Hàm tạo sparkles
    const createParticle = (x, y, isSparkle) => {
        const el = document.createElement("div");
        el.classList.add(isSparkle ? "sparkle" : "particle");

        if (isSparkle) {
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        document.body.appendChild(el);

        animateParticle(el, isSparkle);
    };

    // Hiệu ứng động cho sparkles
    const animateParticle = (el, isSparkle) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = anime.random(100, 200);
        const duration = anime.random(1200, 2000);
        const fallDistance = anime.random(20, 80);
        const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() + 0.5;

        anime
            .timeline({
                targets: el,
                easing: "easeOutCubic",
                duration: duration,
                complete: () => el.remove(),
            })
            .add({
                translateX: Math.cos(angle) * distance,
                translateY: Math.sin(angle) * distance,
                scale: [0, scale],
                opacity: [1, 0.9],
            })
            .add({
                translateY: `+=${fallDistance}px`,
                opacity: [0.9, 0],
                easing: "easeInCubic",
                duration: duration / 2,
            });
    };


    useEffect(() => {
        const interval = setInterval(() => {
            const centerX = window.innerWidth / 2 + Math.random() * 200 + 50 ;  // Trung tâm + khoảng lệch ngẫu nhiên trong phạm vi -100 đến 100
            const centerY = window.innerHeight / 2 + Math.random() * 200  + 50;
            createFirework(centerX, centerY);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return null; // Không hiển thị UI vì hiệu ứng hoạt động trên toàn màn hình
};

export default Fireworks;
