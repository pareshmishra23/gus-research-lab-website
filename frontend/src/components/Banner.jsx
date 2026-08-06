export default function Banner({ title, subtitle }) {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
