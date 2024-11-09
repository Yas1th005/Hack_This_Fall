import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PlanetSignalSimulation = () => {
    const mountRef = useRef(null);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [infoBox, setInfoBox] = useState({ visible: false, x: 0, y: 0, text: '' });

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 12;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
        mountRef.current.appendChild(renderer.domElement);

        // Controls for orbiting
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Function to create celestial bodies
        const createSphere = (position, color, size) => {
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(...position);
            scene.add(sphere);
            return sphere;
        };

        // Planets and celestial objects
        const earth = createSphere([-8, 0, 0], 0x1e90ff, 0.5);
        const sun = createSphere([-2, 2, 0], 0xffd700, 1);
        const jupiter = createSphere([7, -3, 0], 0xff6347, 0.7);

        // Asteroids
        const asteroid1 = createSphere([0, 4, -1], 0x808080, 0.3);
        const asteroid2 = createSphere([3, -2, 0], 0x606060, 0.3);

        // Create the signal path with a curve around the sun
        const signalPath = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-8, 0, 0), // Earth
            new THREE.Vector3(-5, 1, 0), // Curve to avoid the Sun
            new THREE.Vector3(-3, 3, 0),
            new THREE.Vector3(0, 2, 0),
            new THREE.Vector3(4, 0, 0),
            new THREE.Vector3(7, -3, 0)  // Jupiter
        ]);

        // Line geometry for the signal
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const signalLine = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(signalLine);

        // Create the moving dot for the signal
        const dotGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const signalDot = new THREE.Mesh(dotGeometry, dotMaterial);
        scene.add(signalDot);

        // EM wave effect on the Sun
        const emWaveGeometry = new THREE.RingGeometry(1.2, 1.5, 32);
        const emWaveMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500, side: THREE.DoubleSide });
        const emWave = new THREE.Mesh(emWaveGeometry, emWaveMaterial);
        emWave.position.set(sun.position.x, sun.position.y, sun.position.z);
        emWave.rotation.x = Math.PI / 2;
        scene.add(emWave);
        emWave.visible = false;

        // Resize handling
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Animation variables
        let t = 0;
        const animateSignal = () => {
            if (!animationStarted) return;

            t += 0.002;
            if (t > 1) t = 1;

            const point = signalPath.getPointAt(t);
            if (point) {
                lineGeometry.setFromPoints([signalPath.getPointAt(0), point]);
                signalDot.position.copy(point);

                // Detect proximity to the Sun and show interference
                if (point.distanceTo(sun.position) < 2) {
                    emWave.visible = true;
                    lineMaterial.color.setHex(0xff0000); // Change line color to red due to interference
                } else {
                    emWave.visible = false;
                    lineMaterial.color.setHex(0x00ff00); // Normal signal color
                }

                // Update info box position
                const screenPosition = point.clone().project(camera);
                const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
                const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;
                setInfoBox({
                    visible: true,
                    x,
                    y,
                    text: point.distanceTo(jupiter.position) < 0.5
                        ? 'Signal reached Jupiter!'
                        : point.distanceTo(sun.position) < 2
                            ? 'Interference detected!'
                            : 'Signal transmitting...'
                });
            }

            renderer.render(scene, camera);
            controls.update();
            if (t < 1) requestAnimationFrame(animateSignal);
        };

        // Start the animation
        if (animationStarted) {
            t = 0;
            animateSignal();
        }

        // Clean-up
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, [animationStarted]);

    const handleButtonClick = () => {
        setAnimationStarted((prev) => !prev);
        setInfoBox({ visible: false, text: '', x: 0, y: 0 });
    };

    return (
        <div className="relative flex flex-col items-center h-screen bg-black text-white">
            <button
                onClick={handleButtonClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mt-4"
            >
                {animationStarted ? 'End Simulation' : 'Start Simulation'}
            </button>

            <div ref={mountRef} className="w-full h-[600px] mt-4" />

            {infoBox.visible && (
                <div
                    className="absolute bg-gray-900 text-white p-3 rounded shadow-lg"
                    style={{ top: infoBox.y, left: infoBox.x }}
                >
                    {infoBox.text}
                </div>
            )}
        </div>
    );
};

export default PlanetSignalSimulation;
