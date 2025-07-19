import { motion } from "framer-motion";

const colors = ["#9C89B8", "#F0A6CA", "#efc3e6", "#f0e6ef", "#b8bedd"];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  initial: {},
  animate: {
    height: [10, 30, 10],
    transition: {
      repeat: Infinity,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const Loader = ({ count = 5 }: { count?: number }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{
        display: "flex",
        gap: 16,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            style={{
              height: 10,
              width: 10,
              backgroundColor: colors[index % colors.length],
              borderRadius: 10,
            }}
          />
        ))}
    </motion.div>
  );
};

export default Loader;
