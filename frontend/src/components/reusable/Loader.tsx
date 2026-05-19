import { motion } from "framer-motion";

const Loader = ({
  size = "",
  position = "",
}: {
  size?: string;
  position?: string;
}) => {
  return (
    <>
      <div
        className={`${size} ${position} flex z-99999 items-center justify-center bg-[#00000095]`}
      >
        <motion.div
          animate={{
            rotateY: 360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="256"
            height="256"
          >
            <defs>
              {/* <!-- Gradient --> */}
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--main-tertiary-light)" />
                <stop offset="100%" stopColor="var(--main-primary)" />
              </linearGradient>
            </defs>

            {/* <!-- Background Circle --> */}
            <circle cx="256" cy="256" r="240" fill="var(--text-primary)" />

            {/* <!-- LM Letters --> */}
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              className="text-[150px] sm:text-[200px] font-bold"
              fill="url(#grad)"
              letterSpacing="-10"
            >
              CM
            </text>
          </svg>
        </motion.div>
      </div>
    </>
  );
};

export default Loader;
