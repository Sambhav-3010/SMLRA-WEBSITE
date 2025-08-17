"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function CNNBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene and Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0f");
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // CNN Elements Group
    const cnnGroup = new THREE.Group();
    scene.add(cnnGroup);

    // CNN layers - funnel arrangement
    const layers = [
      { count: 8, x: -16 },
      { count: 6, x: -8 },
      { count: 4, x: 0 },
      { count: 6, x: 8 },
      { count: 8, x: 16 },
    ];
    const spacing = 3.8;

    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.CircleGeometry(0.3, 32);

    // Highlight material for hover
    const hoverMat = new THREE.MeshBasicMaterial({ color: "#fbbf24" }); // Amber

    // Default node material
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#F5F5DC"),
    });

    // Connections for pulse movement
    const connections: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    // Create nodes and connections
    layers.forEach((layer, li) => {
      const totalHeight = (layer.count - 1) * spacing;
      for (let i = 0; i < layer.count; i++) {
        // Node position
        const node = new THREE.Mesh(
          nodeGeometry.clone(),
          nodeMaterial.clone()
        );
        node.position.set(
          layer.x,
          i * spacing - totalHeight / 2,
          0
        );
        node.userData = { layer: li, index: i };
        cnnGroup.add(node);
        nodes.push(node);

        // Connect to previous layer
        if (li > 0) {
          const prevLayer = layers[li - 1];
          const prevTotalHeight = (prevLayer.count - 1) * spacing;
          for (let j = 0; j < prevLayer.count; j++) {
            const prevPos = new THREE.Vector3(
              prevLayer.x,
              j * spacing - prevTotalHeight / 2,
              0
            );
            const currPos = node.position.clone();
            // Line geometry
            const geo = new THREE.BufferGeometry().setFromPoints([prevPos, currPos]);
            const line = new THREE.Line(
              geo,
              new THREE.LineBasicMaterial({
                color: "#6366f1",
                transparent: true,
                opacity: 0.25,
              })
            );
            cnnGroup.add(line);
            connections.push({ start: prevPos, end: currPos });
          }
        }
      }
    });

    // Pulse colors
    const pulseMaterials = [
      new THREE.MeshBasicMaterial({ color: "#f97316" }),
      new THREE.MeshBasicMaterial({ color: "#eab308" }),
      new THREE.MeshBasicMaterial({ color: "#22c55e" }),
      new THREE.MeshBasicMaterial({ color: "#06b6d4" }),
      new THREE.MeshBasicMaterial({ color: "#3b82f6" }),
      new THREE.MeshBasicMaterial({ color: "#8b5cf6" }),
      new THREE.MeshBasicMaterial({ color: "#ec4899" }),
    ];
    const pulseGeometry = new THREE.CircleGeometry(0.15, 16);

    // Pulse objects
    const pulses: {
      mesh: THREE.Mesh;
      start: THREE.Vector3;
      end: THREE.Vector3;
      progress: number;
      speed: number;
      resetTimer: number;
      active: boolean;
    }[] = [];

    // Helper to get random connection
    const getRandomConnection = () => {
      return connections[Math.floor(Math.random() * connections.length)];
    };

    // Pulse count
    const numPulses = Math.max(6, Math.floor(connections.length / 8));
    for (let i = 0; i < numPulses; i++) {
      const randomConn = getRandomConnection();
      const mesh = new THREE.Mesh(
        pulseGeometry.clone(),
        pulseMaterials[Math.floor(Math.random() * pulseMaterials.length)].clone()
      );
      cnnGroup.add(mesh);
      pulses.push({
        mesh,
        start: randomConn.start.clone(),
        end: randomConn.end.clone(),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.002,
        resetTimer: Math.random() * 3000 + 2000,
        active: false,
      });
    }

    // Track which node is hovered
    let hoveredIdx: null | number = null;

    // Main animation loop
    let lastTime = Date.now();
    const animate = () => {
      requestAnimationFrame(animate);
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Pulse animation
      pulses.forEach((p, idx) => {
        p.progress += p.speed;
        p.resetTimer -= deltaTime;
        // If a node is hovered, reroute some pulses to/from that node
        if (hoveredIdx !== null && idx < Math.ceil(numPulses/2)) {
          const node = nodes[hoveredIdx];
          // Reroute pulse: if not already at this node
          if (p.start.distanceTo(node.position) > 0.01) {
            const possibleCons = connections.filter(
              c => c.start.equals(node.position)
            );
            if (possibleCons.length > 0) {
              const newConn = possibleCons[Math.floor(Math.random() * possibleCons.length)];
              p.start = newConn.start.clone();
              p.end = newConn.end.clone();
              p.progress = 0;
              p.speed = 0.004 + Math.random() * 0.004; // Faster on hover
              const newMat = pulseMaterials[Math.floor(Math.random() * pulseMaterials.length)];
              p.mesh.material = newMat.clone();
              p.active = true;
            }
          }
        } else {
          p.active = false;
          // Normal path reset
          if (p.progress >= 1 || p.resetTimer <= 0) {
            const newConn = getRandomConnection();
            p.start = newConn.start.clone();
            p.end = newConn.end.clone();
            p.progress = 0;
            p.speed = 0.003 + Math.random() * 0.002;
            p.resetTimer = Math.random() * 3000 + 2000;
            const newMat = pulseMaterials[Math.floor(Math.random() * pulseMaterials.length)];
            p.mesh.material = newMat.clone();
          }
        }
        // Position update
        const pos = new THREE.Vector3().lerpVectors(p.start, p.end, p.progress);
        p.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      const aspect = mount.clientWidth / mount.clientHeight;
      const frustumSize = 30;;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Mouse interaction
    const handlePointerMove = (event: MouseEvent) => {
      // Get bounding rect
      const rect = renderer.domElement.getBoundingClientRect();
      // Normalize coordinates
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);
      if (intersects.length > 0) {
        const hovered = nodes.indexOf(intersects[0].object as THREE.Mesh);
        if (hoveredIdx !== hovered) {
          // Remove previous highlight
          if (hoveredIdx !== null) {
            nodes[hoveredIdx].material = nodeMaterial.clone();
          }
          nodes[hovered].material = hoverMat.clone();
          hoveredIdx = hovered;
        }
      } else {
        // Remove highlight
        if (hoveredIdx !== null) {
          nodes[hoveredIdx].material = nodeMaterial.clone();
          hoveredIdx = null;
        }
      }
    };

    renderer.domElement.addEventListener("pointermove", handlePointerMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full -z-10" />
  );
}
