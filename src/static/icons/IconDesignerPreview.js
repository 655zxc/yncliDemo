import classNames from "classnames";
export default {
  name: "IconDesignerPreview",
  functional: true,
  render(createElement, context) {
    let { data, listeners } = context;
    const classString = classNames(["anticon", data.staticClass, data.class]);
    const style = { ...(data.staticStyle || {}), ...(data.style || {}) };
    const iProps = {
      class: classString,
      style,
      on: listeners
    };
    return (
      <i {...iProps}>
        <svg
          class="icon svg-icon"
          id="icondesigner-preview"
          viewBox="0 0 1194 1024"
        >
          <path
            d="M597.077333 47.530667c204.202667 0 391.509333 117.845333 562.005334 353.536 46.848 66.56 46.848 155.306667 0 221.866666-170.410667 235.690667-357.717333 353.536-562.005334 353.536-204.202667 0-391.509333-117.845333-561.92-353.536a192.768 192.768 0 0 1 0-221.866666C205.482667 165.376 392.789333 47.530667 597.077333 47.530667z m0 88.490666c-178.005333 0-343.637333 104.277333-500.053333 320.512a96.426667 96.426667 0 0 0 0 110.933334c156.416 216.234667 322.048 320.426667 500.053333 320.426666 178.005333 0 343.722667-104.192 500.138667-320.426666a96.426667 96.426667 0 0 0 0-110.933334c-156.416-216.234667-322.133333-320.426667-500.053333-320.426666v-0.085334zM596.992 246.613333a265.386667 265.386667 0 1 1 0 530.773334 265.386667 265.386667 0 0 1 0-530.773334z m0 86.186667a179.2 179.2 0 1 0 0 358.4 179.2 179.2 0 0 0 0-358.4z"
            fill="#4A4A4A"
          ></path>
          <path
            d="M398.08 512A199.082667 199.082667 0 1 0 796.16 512a199.082667 199.082667 0 0 0-398.08 0z"
            fill="#D8D8D8"
          ></path>
        </svg>
      </i>
    );
  }
};
