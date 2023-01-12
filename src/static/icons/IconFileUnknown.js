import classNames from "classnames";
export default {
  name: "IconFileUnknown",
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
          id="iconfile-unknown"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M0 0v1024h1024V191.707429L768 0H603.209143z"
            fill="#D3D3D3"
          ></path>
          <path d="M768 192L1024 384V192z" fill="#9E9E9E"></path>
          <path d="M768 192H1024L768 0" fill="#E2E2E2"></path>
          <path
            d="M506.88 665.234286a36.059429 36.059429 0 0 1-35.84-39.570286c4.827429-49.956571 41.472-90.258286 81.773714-130.56 64.438857-64.512 65.536-84.992 66.706286-106.715429 1.243429-25.307429-8.045714-49.737143-26.404571-69.12-20.918857-21.942857-50.468571-34.596571-81.188572-34.596571h-0.219428a107.666286 107.666286 0 0 0-107.300572 107.52 35.986286 35.986286 0 1 1-72.045714 0c0-47.908571 18.651429-92.891429 52.443428-126.756571a178.249143 178.249143 0 0 1 126.683429-52.736 184.758857 184.758857 0 0 1 133.851429 57.051428c32.036571 33.718857 48.420571 77.238857 46.08 122.441143-2.56 46.299429-16.749714 82.797714-87.771429 153.819429-35.986286 35.986286-58.660571 62.976-60.928 86.674285a35.986286 35.986286 0 0 1-35.84 32.548572zM460.361143 768a43.300571 43.300571 0 1 0 86.601143 0 43.300571 43.300571 0 0 0-86.601143 0z"
            fill="#DA3737"
          ></path>
        </svg>
      </i>
    );
  }
};
