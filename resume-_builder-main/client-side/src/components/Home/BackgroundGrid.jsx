const BackgroundGrid = () => {
  return (
    <svg
      className="absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 1440 720"
      fill="none"
    >
      <path stroke="#E2E8F0" strokeOpacity=".7" d="M-15 702H1440" />
      <path stroke="#E2E8F0" strokeOpacity=".7" d="M-15 573H1440" />
      <path stroke="#E2E8F0" strokeOpacity=".7" d="M-15 164H1440" />
      <circle cx="712" cy="373" r="308" stroke="#E2E8F0" strokeOpacity=".7" />
      <circle cx="17" cy="21" r="308" stroke="#E2E8F0" strokeOpacity=".7" />
      <circle cx="783" cy="411" r="308" stroke="#E2E8F0" strokeOpacity=".7" />
    </svg>
  );
};

export default BackgroundGrid;
