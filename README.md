# cuycoders.dev

Web estática de CuyCoders, publicada con GitHub Pages en https://cuycoders.dev.

- `/alfalfa/`: AlfalfaCode, el agente de programación de código abierto.
- `/alfalfa/cloud/`: Alfalfa Cloud y sus códigos de cortesía.
- `/alfalfa/privacidad/`: aviso de privacidad y condiciones de Alfalfa Cloud.
- `/alfalfa/instalar.sh`: el instalador de la CLI (`curl -fsSL https://cuycoders.dev/alfalfa/instalar.sh | sh`).
  Es una copia de `alfalfa/instalar.sh` de [AlfalfaCode](https://github.com/0sw2ld0/AlfalfaCode): no se edita aquí,
  se vuelve a copiar cuando cambia allí.

Sin compilación: HTML, CSS y un poco de JavaScript. Para verla en local:

```bash
python3 -m http.server 8791
```

Los colores salen de la app de Mac de AlfalfaCode (`alfalfa-mac/Sources/AlfalfaCode/Theme.swift`).
Las fuentes van servidas desde aquí; sus licencias están en `assets/fonts/LICENCIAS.txt`.
