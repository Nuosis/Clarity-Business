export default function CompanyLogo({ className,type='dm'}) {

  // Check the current theme to load the appropriate logo

  const logoSrc = type !=="dm" ?
  '/horizontal_logo_lm.png':'/horizontal_logo_dm.png'

  return (
    <img 
      src={logoSrc} 
      alt="Clarity Business Solutions Logo" 
      className={className} 
      height="26" 
    />
  );
}
