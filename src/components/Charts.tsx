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
