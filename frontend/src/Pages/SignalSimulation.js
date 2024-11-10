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
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
        mountRef.current.appendChild(renderer.domElement);

        // Orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Create celestial bodies
        const createSphere = (position, color, size) => {
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(...position);
            scene.add(sphere);
            return sphere;
        };

        const earth = createSphere([-12, 0, 0], 0x1e90ff, 0.6);
        const sun = createSphere([0, 0, 0], 0xffd700, 1.5); // Sun at the center
        const jupiter = createSphere([12, 0, 0], 0xff6347, 1);

        // Create stars
        const createStars = () => {
            for (let i = 0; i < 100; i++) {
                createSphere(
                    [Math.random() * 30 - 15, Math.random() * 20 - 10, Math.random() * 5 - 2.5],
                    0xffffff,
                    0.1
                );
            }
        };
        createStars();

        // Create the signal path, passing through the Sun
        const signalPath = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-12, 0, 0), // Earth
            new THREE.Vector3(-6, 1, 0),  // Curve point before the Sun
            new THREE.Vector3(0, 0, 0),   // Passing through the Sun
            new THREE.Vector3(6, -1, 0),  // Curve point after the Sun
            new THREE.Vector3(12, 0, 0)   // Jupiter
        ]);

        // Line geometry for the signal
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const signalLine = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(signalLine);

        // Signal dot
        const dotGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const signalDot = new THREE.Mesh(dotGeometry, dotMaterial);
        scene.add(signalDot);

        // Sun interference effect
        const pulseEffect = new THREE.RingGeometry(1.8, 2, 32);
        const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500, side: THREE.DoubleSide });
        const pulse = new THREE.Mesh(pulseEffect, pulseMaterial);
        pulse.position.set(sun.position.x, sun.position.y, sun.position.z);
        pulse.rotation.x = Math.PI / 2;
        scene.add(pulse);
        pulse.visible = false;

        // Resize handling
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Animation variables
        let t = 0;
        let signalStrength = 100;

        const animateSignal = () => {
            if (!animationStarted) return;

            t += 0.001; // Slow down the animation
            if (t > 1) t = 1;

            const point = signalPath.getPointAt(t);
            if (point) {
                lineGeometry.setFromPoints([signalPath.getPointAt(0), point]);
                signalDot.position.copy(point);

                // Gradually change color as signal travels
                const colorValue = 0x00ff00 - Math.floor(t * 0x00ff00);
                dotMaterial.color.setHex(colorValue);
                lineMaterial.color.setHex(colorValue);

                // Detect proximity to Sun for interference
                if (point.distanceTo(sun.position) < 2) {
                    pulse.visible = true;
                    lineMaterial.color.setHex(0xff0000);
                    signalStrength -= 0.8; // Signal weakens more due to interference
                } else {
                    pulse.visible = false;
                }

                // Update info box
                const screenPosition = point.clone().project(camera);
                const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
                const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;
                setInfoBox({
                    visible: true,
                    x,
                    y,
                    text: `Signal Strength: ${signalStrength.toFixed(2)}%`
                });
            }

            renderer.render(scene, camera);
            controls.update();
            if (t < 1) requestAnimationFrame(animateSignal);
        };

        if (animationStarted) {
            t = 0;
            signalStrength = 100;
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
                {animationStarted ? 'End Simulation' : 'View Simulation'}
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
