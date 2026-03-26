const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;

      // Ternary replacements
      const ternaryRegex1 = /locale\s*===\s*["']ta["']\s*\?\s*([a-zA-Z0-9_.\[\]]+_ta)\s*:\s*([a-zA-Z0-9_.\[\]]+_en)/g;
      if (ternaryRegex1.test(content)) {
        content = content.replace(ternaryRegex1, '$2');
        modified = true;
      }
      
      const ternaryRegex1b = /\(\s*locale\s*===\s*["']ta["']\s*\?\s*([a-zA-Z0-9_.\[\]]+_ta)\s*:\s*([a-zA-Z0-9_.\[\]]+_en)\s*\)/g;
      if (ternaryRegex1b.test(content)) {
        content = content.replace(ternaryRegex1b, '$2');
        modified = true;
      }

      const ternaryRegex2 = /locale\s*===\s*["']en["']\s*\?\s*([a-zA-Z0-9_.\[\]]+_en)\s*:\s*([a-zA-Z0-9_.\[\]]+_ta)/g;
      if (ternaryRegex2.test(content)) {
        content = content.replace(ternaryRegex2, '$1');
        modified = true;
      }

      const ternaryRegex2b = /\(\s*locale\s*===\s*["']en["']\s*\?\s*([a-zA-Z0-9_.\[\]]+_en)\s*:\s*([a-zA-Z0-9_.\[\]]+_ta)\s*\)/g;
      if (ternaryRegex2b.test(content)) {
        content = content.replace(ternaryRegex2b, '$1');
        modified = true;
      }

      const localeDecl = /const\s*\{\s*t\s*,\s*locale\s*\}\s*=\s*useLanguageStore\(\)/g;
      if (localeDecl.test(content)) {
        content = content.replace(localeDecl, 'const { t } = useLanguageStore()');
        modified = true;
      }

      if (file === 'types.ts') {
        const typesRegex = /[a-zA-Z0-9]+_ta\??\s*:\s*(?:string|string\[\])\s*;?/g;
        if (typesRegex.test(content)) {
          content = content.replace(typesRegex, '');
          modified = true;
        }
      }

      if (file === 'mock-data.ts') {
        const mockStringRegex = /[a-zA-Z0-9]+_ta\s*:\s*"(?:[^"\\]|\\.)*"\s*,?/g;
        if (mockStringRegex.test(content)) {
          content = content.replace(mockStringRegex, '');
          modified = true;
        }
        
        const mockArrayRegex = /[a-zA-Z0-9]+_ta\s*:\s*\[[^\]]*\]\s*,?/g;
        if (mockArrayRegex.test(content)) {
          content = content.replace(mockArrayRegex, '');
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

['app', 'components', 'lib'].forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (fs.existsSync(fullDir)) processDir(fullDir);
});
