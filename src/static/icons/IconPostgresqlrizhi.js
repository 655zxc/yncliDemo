import classNames from "classnames";
export default {
  name: "IconPostgresqlrizhi",
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
          id="iconPostgresqlrizhi"
          viewBox="0 0 1024 1024"
        >
          <path d="M148.769065 566.630941H45.128079a39.935059 39.935059 0 0 0-38.837942 17.261307 37.740825 37.740825 0 0 0 0 41.690446 39.935059 39.935059 0 0 0 38.764801 17.334449h103.714127a38.837942 38.837942 0 0 0 34.010627-38.179672 38.837942 38.837942 0 0 0-34.010627-38.10653z m12.580275-336.449212a24.355997 24.355997 0 0 1-24.648562-24.136574V91.579281a13.896815 13.896815 0 0 1 11.848863-14.920791h530.712062c6.582702 0 12.799698-2.55994 17.40759-7.021549a23.697727 23.697727 0 0 0 7.240972-17.041884v-28.525042A24.355997 24.355997 0 0 0 679.261703 0.006583h-546.364264a77.749024 77.749024 0 0 0-54.563285 21.430352 73.872544 73.872544 0 0 0-22.966316 52.661616v132.019745c0 13.238545-10.97117 23.990292-24.648562 23.990291a24.50228 24.50228 0 0 0-24.721703 24.063433v27.427925c0 6.43642 2.55994 12.580275 7.240972 17.041884 4.681033 4.53475 10.97117 7.021549 17.553872 7.021549h130.556923a24.867985 24.867985 0 0 0 17.407589-7.021549 23.624586 23.624586 0 0 0 7.167831-17.041884v-27.427925a23.624586 23.624586 0 0 0-7.09469-17.041884 24.867985 24.867985 0 0 0-17.407589-7.021549h-0.073141z m-13.165404 168.224606H45.347503a39.057365 39.057365 0 0 0-39.496212 38.545377c0 21.28407 17.700154 38.545377 39.496212 38.545377h103.348421c21.796058 0 39.496212-17.261307 39.496211-38.545377a39.057365 39.057365 0 0 0-39.496211-38.545377h-0.585129z m809.745484 77.090754h-33.425498a24.50228 24.50228 0 0 0-24.867985 24.136574v433.214931a13.896815 13.896815 0 0 1-11.775722 14.920791H150.597593a13.823674 13.823674 0 0 1-11.775722-14.920791V818.455862c0-13.238545 10.97117-23.990292 24.57542-23.990292 6.582702 0 12.872839-2.55994 17.553872-7.094689a23.697727 23.697727 0 0 0 7.09469-17.041884v-24.429139a23.697727 23.697727 0 0 0-7.167831-16.968743 24.941126 24.941126 0 0 0-17.480731-7.09469H30.719276a24.50228 24.50228 0 0 0-24.721703 24.063433v24.429139c0 13.311686 11.044311 24.136574 24.721703 24.136573 13.604251 0 24.648562 10.751747 24.648562 23.990292v131.65404A75.920496 75.920496 0 0 0 132.897439 1023.982446h772.443507c20.479517 0.292565 40.081341-7.460396 54.636426-21.357211 14.628227-13.896815 22.893175-32.91351 23.112598-52.807898v-450.54938a24.429138 24.429138 0 0 0-24.136574-24.136574l-1.023976 0.438847z m41.690446-290.589722L906.218639 98.966536a88.208207 88.208207 0 0 0-118.561777 2.194234L372.288367 507.386623a29.622159 29.622159 0 0 0-6.948407 10.824888l-82.064351 223.080456a26.915937 26.915937 0 0 0 7.899242 30.134147c9.069501 8.118666 21.869199 10.898029 33.644921 7.240972l246.193054-74.165109a35.839155 35.839155 0 0 0 13.165404-7.972384l418.074717-409.078357A69.776641 69.776641 0 0 0 1023.975863 235.667314a69.922923 69.922923 0 0 0-23.844009-50.906229l-0.585129 0.146282zM381.650433 689.946891l34.303191-93.181803 68.606383 61.584834-102.909574 31.596969z m186.875595-82.503198L469.492933 517.845805l191.483487-187.607006 98.959953 89.963593-191.337204 187.314442z m366.802782-359.708092L832.638659 348.158376l-99.106235-89.963593 101.885598-99.910788a13.311686 13.311686 0 0 1 9.874053-3.949621c3.657057-0.219423 7.240972 1.097117 9.874053 3.583915l79.870118 72.190298a11.702581 11.702581 0 0 1 0 17.334449l0.365705 0.292565z"></path>
        </svg>
      </i>
    );
  }
};
