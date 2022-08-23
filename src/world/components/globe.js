import ThreeGlobe from "three-globe";
import countries from "../assets/globe-min.json";
import arcsData from "../assets/arcs-data.json";
import { hexToRgb, genRandomNumbers } from "../systems/utils";
import { Color } from 'three';

const ARC_REL_LEN = 0.9; // relative to whole arc
const FLIGHT_TIME = 2000;
const NUM_RINGS = 1;
const RINGS_MAX_R = 3; // deg
const RING_PROPAGATION_SPEED = 3; // deg/sec

const interval = 2;
let deltaGlobe = 0;
let numbersOfRings = 0;

class Globe {
    constructor() {
        this.instance = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true });
        this.pointsData = [];

        this._buildData();
        this._buildMaterial();

        this.instance.tick = (delta) => this.tick(delta);
    }

    init() {
        this.initCountries(1000);
        this.initAnimationData(1000);
    }

    initCountries(delay) {
        setTimeout(() => {
            this.instance
                .hexPolygonsData(countries.features)
                .hexPolygonResolution(3)
                .hexPolygonMargin(0.7)
                .showAtmosphere(true)
                .atmosphereColor("#ffffff")
                .atmosphereAltitude(0.10)
                .hexPolygonColor((e) => { return 'rgba(255,255,255, 0.7)'; });
        }, delay);
    }

    initAnimationData(delay) {
        setTimeout(() => {
            this.instance.arcsData(arcsData.flights)
                .arcStartLat(d => d.startLat * 1)
                .arcStartLng(d => d.startLng * 1)
                .arcEndLat(d => d.endLat * 1)
                .arcEndLng(d => d.endLng * 1)
                .arcColor((e) => e.color)
                .arcAltitude((e) => {
                    return e.arcAlt * 1;
                })
                .arcStroke((e) => {
                    return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
                })
                .arcDashLength(ARC_REL_LEN)
                .arcDashInitialGap((e) => e.order * 1)
                .arcDashGap(15)
                .arcDashAnimateTime((e) => FLIGHT_TIME)
                .pointsData(this.pointsData)
                .pointColor((e) => e.color)
                .pointsMerge(true)
                .pointAltitude(0.0)
                .pointRadius(0.25)
                .ringsData([])
                .ringColor((e) => t => e.color(t))
                .ringMaxRadius(RINGS_MAX_R)
                .ringPropagationSpeed(RING_PROPAGATION_SPEED)
                .ringRepeatPeriod(FLIGHT_TIME * ARC_REL_LEN / NUM_RINGS);
        }, delay);
    }

    tick(delta) {
        deltaGlobe += delta;

        if (deltaGlobe > interval) {
            numbersOfRings = genRandomNumbers(0, this.pointsData.length, Math.floor(this.pointsData.length * 4 / 5));
            this.instance.ringsData(this.pointsData.filter((d, i) => numbersOfRings.includes(i)));

            deltaGlobe = deltaGlobe % interval;
        }
    }

    _buildData() {
        const arcs = arcsData.flights;
        let points = [];
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            const rgb = hexToRgb(arc.color);
            points.push({
                size: 1.0,
                order: arc.order,
                color: (t) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
                label: arc.from,
                lat: arc.startLat,
                lng: arc.startLng
            });
            points.push({
                size: 1.0,
                order: arc.order,
                color: (t) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
                label: arc.to,
                lat: arc.endLat,
                lng: arc.endLng
            });
        }

        // remove duplicates for same lat and lng
        this.pointsData = points.filter((v, i, a) => a.findIndex(v2 => ['lat', 'lng'].every(k => v2[k] === v[k])) === i);
    }

    _buildMaterial() {
        const globeMaterial = this.instance.globeMaterial();
        globeMaterial.color = new Color(0x3b42ec);
        globeMaterial.emissive = new Color(0x220038);
        globeMaterial.emissiveIntensity = 0.1;
        globeMaterial.shininess = 0.9;
    }
}

export { Globe };