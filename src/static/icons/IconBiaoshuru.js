import classNames from "classnames";
export default {
  name: "IconBiaoshuru",
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
        <svg class="icon svg-icon" id="iconbiaoshuru" viewBox="0 0 1024 1024">
          <path d="M843.337788 0c21.284495 0 38.473005 17.261653 38.473006 38.619291v463.285202a9.727965 9.727965 0 0 1-1.023997 4.461699l-0.146285 27.209045c-0.146285 5.266267-13.970236 9.58168-30.939318 9.58168H374.932604v448.656684c0 14.409091-3.291417 26.404477-7.679973 29.257038l-1.901707 0.585141h-34.303878a9.654823 9.654823 0 0 1-6.363406 2.340563H75.047961A38.253578 38.253578 0 0 1 36.574955 985.30391V38.619291C36.574955 17.261653 53.763465 0 74.974818 0H843.337788zM298.279163 783.8692H123.029503v153.306882l175.176518-0.073143v-153.233739zM585.144424 605.986407a9.58168 9.58168 0 0 1 10.166821-1.023996 9.727965 9.727965 0 0 1 5.412552 8.630826v91.793958h377.050082c5.266267 0 9.58168 4.388556 9.58168 9.654823v67.583758c0 5.412552-4.388556 9.654823-9.58168 9.654823H600.79694v91.793958c0 3.65713-2.121135 7.094832-5.412552 8.777111a9.58168 9.58168 0 0 1-10.166821-1.097139l-170.349106-135.313802a9.654823 9.654823 0 0 1 0-15.21366l170.422249-135.24066z m-462.261206-64.146056V706.557477h175.24966V543.156917H138.682019c-5.778265 0-11.117675-0.438856-15.652516-1.243424v-0.073142z m0-247.221975v172.616527c4.607984-0.877711 9.947393-1.316567 15.725658-1.38971h159.45086V304.053771c0-3.291417 0.219428-6.436548 0.58514-9.508537l-174.810804 0.073142h-0.877711z m672.399885 0H629.176267V465.918336h166.179978V294.618376z m-242.906561 0H374.493748c0.29257 2.925704 0.438856 6.143978 0.438856 9.508538V465.918336h177.51708V294.618376z m242.833418-207.651829h-672.180457l-0.073142 130.340105H795.283103V86.966547z"></path>
        </svg>
      </i>
    );
  }
};
