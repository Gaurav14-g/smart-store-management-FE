import { useEffect, useRef } from 'react';

interface BarChartProps {
  title: string;
  labels: string[];
  data: number[];
  color?: string;
}

export const BarChart = ({ title, labels, data, color = '#2563eb' }: BarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxValue = Math.max(...data, 1);
    const barWidth = chartWidth / data.length;

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * barWidth + barWidth * 0.1;
      const y = canvas.height - padding - barHeight;

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth * 0.8, barHeight);

      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(labels[index], x + barWidth * 0.4, canvas.height - padding + 20);
      ctx.fillText(value.toString(), x + barWidth * 0.4, y - 5);
    });

    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(title, padding, 25);
  }, [title, labels, data, color]);

  return <canvas ref={canvasRef} width={400} height={250} style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }} />;
};

interface LineChartProps {
  title: string;
  labels: string[];
  data: number[];
  color?: string;
}

export const LineChart = ({ title, labels, data, color = '#2563eb' }: LineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 500;
    const H = 220;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 30, right: 20, bottom: 40, left: 55 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;
    const maxVal = Math.max(...data, 1);
    const minVal = Math.min(...data, 0);
    const range = maxVal - minVal || 1;

    // background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // grid lines
    const gridLines = 4;
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (ch / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cw, y);
      ctx.stroke();
      const val = maxVal - (range / gridLines) * i;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Inter, Arial';
      ctx.textAlign = 'right';
      ctx.fillText(val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(0), pad.left - 8, y + 4);
    }

    if (data.length < 2) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Not enough data', W / 2, H / 2);
      return;
    }

    const px = (i: number) => pad.left + (i / (data.length - 1)) * cw;
    const py = (v: number) => pad.top + ch - ((v - minVal) / range) * ch;

    // fill area
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
    grad.addColorStop(0, color + '33');
    grad.addColorStop(1, color + '00');
    ctx.beginPath();
    ctx.moveTo(px(0), py(data[0]));
    data.forEach((v, i) => { if (i > 0) ctx.lineTo(px(i), py(v)); });
    ctx.lineTo(px(data.length - 1), pad.top + ch);
    ctx.lineTo(px(0), pad.top + ch);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // line
    ctx.beginPath();
    ctx.moveTo(px(0), py(data[0]));
    data.forEach((v, i) => { if (i > 0) ctx.lineTo(px(i), py(v)); });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // dots + labels
    data.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(px(i), py(v), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.font = '11px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], px(i), H - pad.bottom + 16);
    });
  }, [title, labels, data, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 220, display: 'block', borderRadius: 8 }}
    />
  );
};

interface PieChartProps {
  title: string;
  labels: string[];
  data: number[];
  colors?: string[];
}

export const PieChart = ({ title, labels, data, colors }: PieChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const defaultColors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 20;
    const radius = 80;
    const total = data.reduce((a, b) => a + b, 0);

    let currentAngle = -Math.PI / 2;

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      const color = colors?.[index] || defaultColors[index % defaultColors.length];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const percentage = ((value / total) * 100).toFixed(0);
      ctx.fillText(`${percentage}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(title, 20, 20);

    let legendY = 180;
    labels.forEach((label, index) => {
      const color = colors?.[index] || defaultColors[index % defaultColors.length];
      ctx.fillStyle = color;
      ctx.fillRect(20, legendY, 12, 12);
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(label, 40, legendY + 10);
      legendY += 20;
    });
  }, [title, labels, data, colors]);

  return <canvas ref={canvasRef} width={400} height={300} style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }} />;
};
