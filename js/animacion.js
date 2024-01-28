
let escena, camara, renderizador, textura, material, cubo;

function iniciar() {
    escena = new THREE.Scene();
    camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camara.position.z = 5;

    renderizador = new THREE.WebGLRenderer();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('escena').appendChild(renderizador.domElement);

    const geometria = new THREE.BoxGeometry(3, 3, 3); // Cambiamos a BoxGeometry
    const cargador = new THREE.TextureLoader();

    // Aplicar la misma textura a cada cara del cubo
    textura = cargador.load('img/hongo.png', function(texture) {
        material = new THREE.MeshBasicMaterial({ map: texture });

        // Crear un material para cada cara del cubo con la misma textura
        let materiales = [];
        for (let i = 0; i < 6; i++) {
            materiales.push(material);
        }

        cubo = new THREE.Mesh(geometria, materiales);
        escena.add(cubo);
        animar();
    });
}

function animar() {
    requestAnimationFrame(animar);

    // Animación: rotar el cubo
    if (cubo) {
        cubo.rotation.x += 0.01;
        cubo.rotation.y += 0.01;
    }

    renderizador.render(escena, camara);
}

window.addEventListener('resize', function () {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});

iniciar();
