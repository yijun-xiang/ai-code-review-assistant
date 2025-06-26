import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulsePhase: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle configuration
    const particles: Particle[] = [];
    const particleCount = 60; 
    const maxDistance = 150;
    const mouseInfluenceRadius = 200;
    
    // Color palette
    const colors = [
      'rgba(139, 92, 246, opacity)', // Purple
      'rgba(236, 72, 153, opacity)', // Pink
      'rgba(59, 130, 246, opacity)',  // Blue
      'rgba(34, 197, 94, opacity)',   // Green
      'rgba(251, 191, 36, opacity)',  // Yellow
    ];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const colorTemplate = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: colorTemplate,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Pulse effect
        particle.pulsePhase += 0.02;
        const pulseFactor = 1 + Math.sin(particle.pulsePhase) * 0.2;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluenceRadius) {
          const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
          particle.vx += (dx / distance) * force * 0.03;
          particle.vy += (dy / distance) * force * 0.03;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Bounce off walls with dampening
        if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
          particle.vx *= -0.9;
          particle.x = particle.x < particle.radius ? particle.radius : canvas.width - particle.radius;
        }
        if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
          particle.vy *= -0.9;
          particle.y = particle.y < particle.radius ? particle.radius : canvas.height - particle.radius;
        }

        // Draw particle with glow effect
        const currentRadius = particle.radius * pulseFactor;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentRadius * 3
        );
        gradient.addColorStop(0, particle.color.replace('opacity', String(particle.opacity)));
        gradient.addColorStop(1, particle.color.replace('opacity', '0'));
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('opacity', String(particle.opacity * 2));
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
          );

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            
            // Create gradient for connection
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              other.x, other.y
            );
            lineGradient.addColorStop(0, particle.color.replace('opacity', String(opacity)));
            lineGradient.addColorStop(1, other.color.replace('opacity', String(opacity)));
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.5 + (1 - distance / maxDistance) * 0.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        opacity: 0.6,
      }}
    />
  );
}