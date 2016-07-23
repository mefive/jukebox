export function debounce(func, wait = 10) {
  let timer = null;
  return function () {
    const arg = arguments;
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(
      function () {
        func.apply(context, arg);
      },
      wait
    );
  }
}

function getParamByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function genTimer(fn, delay, wait = 0) {
  let timer;
  let waitTimer;

  const processFn = () => {
    timer = setTimeout(processFn, delay);
    fn();
  };

  const switcher = {
    start() {
      switcher.stop();

      waitTimer = setTimeout(
        () => {
          clearTimeout(waitTimer);
          waitTimer = null;

          processFn();
        },
        wait
      );
    },

    stop() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (waitTimer) {
        clearTimeout(waitTimer);
        waitTimer = null;
      }
    }
  };

  return switcher;
}

function entryAnimate(vm, transition, callback) {
  const varObj = { value: 100 };

  transition.next();

  TweenLite.to(
    varObj,
    0.2,
    {
      value: 0,
      onUpdate() {
        const val = Math.floor(varObj.value);
        vm.$el.style.webkitTransform = `translateX(${val}%)`;
      },
      onUpdateScope: vm,
      onComplete() {
        callback();
      }
    }
  );
}

function deepAssign(target, source) {
  for (var i in source) {
    if (i in target) {
      if ((typeof target[i] !== 'object')
        || (Array.isArray(target[i]) && Array.isArray(source[i]))
      ) {
        if (typeof target[i] === typeof source[i]) {
          target[i] = source[i];
        }
      }
      else {
        deepAssign(target[i], source[i]);
      }
    }
  }
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }
}

function decimalLength(str) {
    var parts = ('' + str).split('.');

    return parts.length === 2 ? parts[1].length : 0;
}

function float2Int(float, length) {
    var parts = ('' + float).split('.');
    var result;

    if (length >= 0) {}
    else {
        length = 0;
    }

    if (parts.length === 1) {
        result = float + new Array(length + 1).join('0');
    }
    else {
        length = Math.max(0, length - parts[1].length);
        result = parts.join('') + new Array(length + 1).join('0');
    }

    return + result;
}

function plus(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    return (a + b) / Math.pow(10, length);
};

function minus(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    return (a - b) / Math.pow(10, length);
};

function multiply(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    var factor = Math.pow(10, length);

    return (a * b) / (factor * factor);
};

function divide(a, b) {
    var length = Math.max(
                    decimalLength(a),
                    decimalLength(b)
                );

    a = float2Int(a, length);
    b = float2Int(b, length);

    return a / b;
};
