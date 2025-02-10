import { motion } from "framer-motion";

export default function FeaturesCards(props) {
  const { icon, title, description, className } = props;
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
  };
  return (
    <>
      <motion.div
        className={`${className}`}
        {...fadeIn}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        whileHover={{
          scale: 1.05,
          y: -10,
        }}
      >
        <div className="text-[#E85C3F] mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </>
  );
}
