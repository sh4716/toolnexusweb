/**
 * ToolNexus Universal Client-Side Utility Library
 * Ultra-Reliable, 100% In-Browser Execution
 */
(function (global) {
  'use strict';

  // 1. Toast Notification
  function showToast(message, type) {
    type = type || 'info';
    try {
      var container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.style.position = 'fixed';
        container.style.bottom = '24px';
        container.style.right = '24px';
        container.style.zIndex = '999999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '8px';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
      }
      var toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.style.pointerEvents = 'auto';
      toast.style.background = type === 'error' ? '#ef4444' : (type === 'warning' ? '#f59e0b' : (type === 'success' ? '#10b981' : '#3b82f6'));
      toast.style.color = '#ffffff';
      toast.style.padding = '10px 18px';
      toast.style.borderRadius = '8px';
      toast.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.3)';
      toast.style.fontSize = '14px';
      toast.style.fontWeight = '500';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '8px';
      toast.style.transition = 'all 0.25s ease';

      var icons = { success: '✓', error: '✗', info: '💡', warning: '⚠️' };
      toast.innerHTML = '<span>' + (icons[type] || '💡') + '</span><span>' + message + '</span>';
      container.appendChild(toast);

      setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 250);
      }, 3000);
    } catch (e) {
      console.log('[Toast] ' + type + ': ' + message);
    }
  }

  // 2. Clipboard Copy
  function copyToClipboard(text, successMsg) {
    var isZh = typeof window !== 'undefined' && window.location && window.location.pathname.startsWith('/zh/');
    successMsg = successMsg || (isZh ? '已成功复制到剪贴板！' : 'Copied to clipboard!');
    if (!text) return Promise.resolve(false);

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg, 'success');
        return true;
      }).catch(function () {
        return fallbackCopy(text, successMsg);
      });
    } else {
      return Promise.resolve(fallbackCopy(text, successMsg));
    }
  }

  function fallbackCopy(text, successMsg) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
      if (ok) showToast(successMsg, 'success');
      else showToast('Please press Ctrl+C to copy manually', 'warning');
    } catch (err) {
      showToast('Copy failed, please select text manually', 'error');
    }
    if (textarea.parentNode) textarea.parentNode.removeChild(textarea);
    return ok;
  }

  // 3. Format Bytes
  function formatBytes(bytes, decimals) {
    decimals = (decimals === undefined) ? 2 : decimals;
    if (!bytes || bytes === 0) return '0 Bytes';
    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    if (i >= sizes.length) i = sizes.length - 1;
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // 4. Download Blob (Ultra-Reliable Cross-Browser Implementation)
  function downloadBlob(blob, filename) {
    if (!blob) {
      console.error('downloadBlob: Blob is null or undefined');
      showToast('Error: No file data to download', 'error');
      return;
    }

    filename = filename || ('download_' + Date.now());

    // IE11 / Edge Legacy
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return;
    }

    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.setAttribute('download', filename);
    a.rel = 'noopener';

    // Must be in DOM for Chromium / Firefox / Safari click trigger
    document.body.appendChild(a);

    try {
      a.click();
    } catch (e) {
      var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      a.dispatchEvent(evt);
    }

    // Keep link in DOM for 8 seconds to ensure browser download manager starts stream
    setTimeout(function () {
      if (a.parentNode) a.parentNode.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 8000);
  }

  // 5. Download DataURL (e.g. from canvas or image base64)
  function downloadDataUrl(dataUrl, filename) {
    if (!dataUrl) {
      console.error('downloadDataUrl: dataUrl is empty');
      showToast('Error: Image data is empty', 'error');
      return;
    }
    filename = filename || ('download_' + Date.now() + '.png');

    // Convert dataUrl to Blob if possible for more reliable large file saving
    if (dataUrl.startsWith('data:')) {
      try {
        var arr = dataUrl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new Blob([u8arr], { type: mime });
        downloadBlob(blob, filename);
        return;
      } catch (e) {
        // Fallback to direct anchor download
      }
    }

    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = dataUrl;
    a.setAttribute('download', filename);
    document.body.appendChild(a);

    try {
      a.click();
    } catch (e) {
      var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      a.dispatchEvent(evt);
    }

    setTimeout(function () {
      if (a.parentNode) a.parentNode.removeChild(a);
    }, 5000);
  }

  // 6. Universal Drag & Drop File Upload Engine
  function initDropzones() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // 全局阻止浏览器窗口默认在空白处释放文件时跳转打开文件的行为
    if (!window._dropzoneGlobalGuarded) {
      window._dropzoneGlobalGuarded = true;
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        window.addEventListener(eventName, function (e) {
          // 只针对从系统/桌面拖拽进入的文件（e.dataTransfer 包含 Files）进行拦截防护
          // 若是页面内部元素拖拽（如图片卡片排序，数据类型为 text/plain），绝不拦截！
          var isFileDrag = false;
          if (e.dataTransfer && e.dataTransfer.types) {
            for (var i = 0; i < e.dataTransfer.types.length; i++) {
              if (e.dataTransfer.types[i] === 'Files') {
                isFileDrag = true;
                break;
              }
            }
          }
          if (!isFileDrag) return;

          // 如果文件拖拽事件并非发生在已知的 dropzone 内部，阻止浏览器直接跳转打开文件
          if (!e.target || (typeof e.target.closest === 'function' && !e.target.closest('.dropzone'))) {
            e.preventDefault();
            if (eventName === 'dragover' && e.dataTransfer) {
              e.dataTransfer.dropEffect = 'none';
            }
          }
        }, false);
      });
    }

    var dropzones = document.querySelectorAll('.dropzone');
    dropzones.forEach(function (dz) {
      if (dz._dropzoneEngineActive) return;
      dz._dropzoneEngineActive = true;

      // 寻找关联的 file input
      var fileInput = dz.querySelector('input[type="file"]');
      if (!fileInput) {
        var onclickAttr = dz.getAttribute('onclick') || '';
        var match = onclickAttr.match(/document\.getElementById\(['"]([^'"]+)['"]\)/);
        if (match && match[1]) {
          fileInput = document.getElementById(match[1]);
        }
      }
      if (!fileInput && dz.id) {
        var cleanId = dz.id.replace(/-dropzone$/, '').replace(/dropzone$/, '');
        fileInput = document.querySelector('input[type="file"][id*="' + cleanId + '"]');
      }
      if (!fileInput) {
        var parent = dz.parentElement;
        if (parent) {
          fileInput = parent.querySelector('input[type="file"]');
        }
      }
      if (!fileInput) {
        var allInputs = document.querySelectorAll('input[type="file"]');
        if (allInputs.length === 1) {
          fileInput = allInputs[0];
        }
      }

      if (!fileInput) return;

      // 统一点击处理：若 dropzone 自身无内联 onclick，点击时呼出关联的 file input
      if (!dz.getAttribute('onclick')) {
        dz.addEventListener('click', function (e) {
          if (e.target !== fileInput) {
            fileInput.click();
          }
        });
      }

      // 拖拽计数器防子节点闪烁
      var dragCounter = 0;

      dz.addEventListener('dragenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dragCounter++;
        dz.classList.add('dragover');
      });

      dz.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'copy';
        }
        dz.classList.add('dragover');
      });

      dz.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dragCounter--;
        if (dragCounter <= 0) {
          dragCounter = 0;
          dz.classList.remove('dragover');
        }
      });

      dz.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dragCounter = 0;
        dz.classList.remove('dragover');

        // 如果页面自身的 drop 事件已经消费了本次拖拽，不再重复派发
        if (e._toolNexusHandled) return;
        e._toolNexusHandled = true;

        var dt = e.dataTransfer;
        if (!dt || !dt.files || dt.files.length === 0) return;

        // 统一把拖入的文件赋给关联的 input[type="file"]
        try {
          if (typeof DataTransfer !== 'undefined') {
            var dataContainer = new DataTransfer();
            var isMultiple = fileInput.hasAttribute('multiple');
            var maxCount = isMultiple ? dt.files.length : 1;
            for (var i = 0; i < maxCount; i++) {
              dataContainer.items.add(dt.files[i]);
            }
            fileInput.files = dataContainer.files;
          }
        } catch (err) {
          console.warn('[Dropzone] DataTransfer assignment error:', err);
        }

        // 派发原生 change 事件以触发关联工具的处理逻辑
        var changeEvt = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(changeEvt);
      });
    });
  }

  // 页面加载就绪时自动启动全局拖拽初始化
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDropzones);
    } else {
      initDropzones();
    }
  }

  // 7. RFC 1321 Standard MD5 Digest Implementation
  function md5(str) {
    if (str === undefined || str === null) str = '';
    function rotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); }
    function addUnsigned(lX, lY) {
      var lX4 = (lX & 0x40000000), lY4 = (lY & 0x40000000), lX8 = (lX & 0x80000000), lY8 = (lY & 0x80000000);
      var lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      } else { return (lResult ^ lX8 ^ lY8); }
    }
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }
    function FF(a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b); }
    function GG(a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b); }
    function HH(a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b); }
    function II(a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b); }
    function convertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = Array(lNumberOfWords - 1);
      for (var i = 0; i < lNumberOfWords; i++) lWordArray[i] = 0;
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    }
    function wordToHex(lValue) {
      var WordToHexValue = '', WordToHexValue_temp = '', lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValue_temp = '0' + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }
      return WordToHexValue;
    }

    var u8 = new TextEncoder().encode(str);
    var binary = '';
    for (var i = 0; i < u8.length; i++) binary += String.fromCharCode(u8[i]);
    var x = convertToWordArray(binary);
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
      AA = a; BB = b; CC = c; DD = d;
      a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478); d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756); c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB); b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
      a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF); d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A); c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613); b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8); d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF); c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1); b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
      a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122); d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193); c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E); b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
      a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562); d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340); c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51); b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
      a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D); d = GG(d, a, b, c, x[k + 10], S22, 0x2441453); c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681); b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
      a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6); d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6); c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87); b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
      a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905); d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8); c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9); b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
      a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942); d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681); c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122); b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
      a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44); d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9); c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60); b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
      a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6); d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA); c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085); b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
      a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039); d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5); c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8); b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
      a = II(a, b, c, d, x[k + 0], S41, 0xF4292244); d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97); c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7); b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
      a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3); d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92); c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D); b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
      a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F); d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0); c = II(c, d, a, b, x[k + 6], S43, 0xA3014314); b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
      a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82); d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235); c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB); b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
      a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }

  // Create unified Utils object
  var Utils = {
    showToast: showToast,
    copyToClipboard: copyToClipboard,
    formatBytes: formatBytes,
    downloadBlob: downloadBlob,
    downloadDataUrl: downloadDataUrl,
    initDropzones: initDropzones,
    md5: md5
  };

  // Export everywhere
  global.Utils = Utils;
  global.showToast = showToast;
  global.copyToClipboard = copyToClipboard;
  global.formatBytes = formatBytes;
  global.downloadBlob = downloadBlob;
  global.downloadDataUrl = downloadDataUrl;
  global.initDropzones = initDropzones;
  global.md5 = md5;

})(typeof window !== 'undefined' ? window : this);
