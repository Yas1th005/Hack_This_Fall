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

        // Planets creation function
        const createPlanet = (position, color, size) => {
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color });
            const planet = new THREE.Mesh(geometry, material);
            planet.position.set(...position);
            scene.add(planet);
            return planet;
        };

        // Add planets
        const earth = createPlanet([-6, 0, 0], 0x1e90ff, 0.5);
        const sun = createPlanet([0, 0, 0], 0xffd700, 1);
        const jupiter = createPlanet([6, 0, 0], 0xff6347, 0.7);

        // Create signal path
        const signalPath = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-6, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(6, 0, 0)
        ]);

        // Line geometry for the signal
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const signalLine = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(signalLine);

        // Create the moving dot
        const dotGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const signalDot = new THREE.Mesh(dotGeometry, dotMaterial);
        signalDot.position.set(-6, 0, 0);
        scene.add(signalDot);

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

            t += 0.002; // Speed of signal movement
            if (t > 1) t = 1; // Stop at Jupiter

            const point = signalPath.getPointAt(t);
            if (point) {
                lineGeometry.setFromPoints([signalPath.getPointAt(0), point]);

                // Change color near Sun
                if (point.distanceTo(sun.position) < 1) {
                    signalLine.material.color.setHex(0xff0000);
                } else {
                    signalLine.material.color.setHex(0x00ff00);
                }

                // Move the signal dot
                signalDot.position.copy(point);

                // Update info box position
                const screenPosition = point.clone().project(camera);
                const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
                const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;
                setInfoBox({
                    visible: true,
                    x,
                    y,
                    text: point.distanceTo(jupiter.position) < 0.1
                        ? 'Signal reached Jupiter!'
                        : point.distanceTo(sun.position) < 1
                        ? 'Interference detected!'
                        : 'Signal transmitting...'
                });
            }

            renderer.render(scene, camera);
            controls.update();

            if (t < 1) {
                requestAnimationFrame(animateSignal);
            }
        };

        if (animationStarted) {
            animateSignal();
        }

        // Clean-up on component unmount
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, [animationStarted]);

    const startSimulation = () => {
        setAnimationStarted(true);
    };

    const restartSimulation = () => {
        setAnimationStarted(false);
        setInfoBox({ visible: false, text: '', x: 0, y: 0 });
    };

    return (
        <div className="relative flex flex-col items-center h-[500px] bg-black text-white">
            <button
                onClick={animationStarted ? restartSimulation : startSimulation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mt-4"
            >
                {animationStarted ? 'End Simulation' : 'Start Simulation'}
            </button>

            <div ref={mountRef} className="w-full h-[500px] flex-grow" />

            {infoBox.visible && (
                <div
                    className="absolute bg-gray-900 text-white p-3 rounded shadow-lg"
                    style={{ top: infoBox.y, left: infoBox.x }}
                >
                    {infoBox.text || 'Signal Starting Point'}
                </div>
            )}
        </div>
    );
};

export default PlanetSignalSimulation;
