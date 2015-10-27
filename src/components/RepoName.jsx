export default ({className, displayName})=>{
  const [owner, repo] = displayName.split('/');
  return <span className={className}>
    <span className="c-gray-darker t-light">{owner}/</span>
    <span className="c-gray-darkest t-normal">{repo}</span>
  </span>;
}
