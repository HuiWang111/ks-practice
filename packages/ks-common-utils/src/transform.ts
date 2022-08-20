export function transformBlobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    if ((blob instanceof Blob)) {
      const reader = new FileReader()
            
      reader.addEventListener('load', () => {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', () => {
        reject(`Failed to read file!\n\n${reader.error?.message}`)
      });
            
      reader.readAsDataURL(blob);
    } else {
      reject(`transformBlobToBase64 param must be Blob or File`);
    }
  });
}

function getMineType(config: string): string {
  const conf: string = config.split(':')[1] || '';

  if (!conf) {
    return '';
  }

  return conf.split(';').find(v => v.includes('/')) || '';
}

/**
 * @param sliceSize 切换处理优化性能
 */
export function transformBase64ToBlob(base64: string, sliceSize = 512): Blob {
  const [config, data] = base64.split(',');
  const mineType = getMineType(config);

  const byteCharacters: string = atob(data);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, { type: mineType });
  return blob;
}
