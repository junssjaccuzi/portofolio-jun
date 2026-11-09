@echo off
title Portofolio Interaktif - Rendra Adie Permana (Jun)
echo ===================================================
echo   Memulai Portofolio Interaktif Senja (Jun)...
echo ===================================================
cd /d "%~dp0"
echo Membuka browser di http://localhost:3000 ...
start http://localhost:3000
npm run dev
pause
