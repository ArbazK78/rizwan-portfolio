import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(w, h);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100);
    camera.position.z = 5;

    // Particles
    const N = 300;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 22;
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({
      color: 0x7c3aed, size: 0.05, transparent: true, opacity: 0.65,
    }));
    scene.add(pts);

    // Floating wireframe shapes
    const defs = [
      { geo: new THREE.IcosahedronGeometry(0.7, 0), color: 0x7c3aed, pos: [-3.2, 0.8, -2] as [number,number,number] },
      { geo: new THREE.OctahedronGeometry(0.5, 0),  color: 0x06b6d4, pos: [3.4, -0.6, -1.5] as [number,number,number] },
      { geo: new THREE.TetrahedronGeometry(0.4, 0), color: 0xa855f7, pos: [0.2, 2, -3] as [number,number,number] },
    ];
    const meshes = defs.map(d => {
      const m = new THREE.Mesh(d.geo, new THREE.MeshBasicMaterial({
        color: d.color, wireframe: true, transparent: true, opacity: 0.35,
      }));
      m.position.set(...d.pos);
      scene.add(m);
      return { mesh: m, base: [...d.pos] as number[] };
    });

    const onMM = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: -(e.clientY / innerHeight - 0.5) * 2,
      };
    };
    const onResize = () => {
      const w2 = canvas.offsetWidth, h2 = canvas.offsetHeight;
      renderer.setSize(w2, h2);
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('mousemove', onMM);
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let raf: number;
    const tick = () => {
      const t = clock.getElapsedTime();
      pts.rotation.y = t * 0.04;
      pts.rotation.x = t * 0.02;
      meshes.forEach(({ mesh, base }, i) => {
        mesh.rotation.x = t * (0.25 + i * 0.08);
        mesh.rotation.y = t * (0.18 + i * 0.12);
        mesh.position.y = base[1] + Math.sin(t * 0.6 + i * 2) * 0.8;
        mesh.position.x += (mouse.current.x * (i + 1) * 0.25 + base[0] - mesh.position.x) * 0.025;
      });
      camera.position.x += (mouse.current.x * 0.4 - camera.position.x) * 0.02;
      camera.position.y += (mouse.current.y * 0.25 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMM);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}