import { motion } from "framer-motion";
import { Users, Rocket, HeartHandshake, Gem } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <HeartHandshake size={32} className="text-pink-500" />,
      title: "Built on Love",
      description: "We started WedCo after our own wedding experiences and wanted to make it stress-free for every couple."
    },
    {
      icon: <Rocket size={32} className="text-purple-500" />,
      title: "Driven by Innovation",
      description: "We use cutting-edge tools to simplify the chaos of wedding planning into a joyful experience."
    },
    {
      icon: <Gem size={32} className="text-indigo-500" />,
      title: "Quality First",
      description: "Every vendor, tool, and design is carefully crafted to meet the highest standards of elegance and reliability."
    }
  ];

  const team = [
    {
      name: "Aanya Mehta",
      role: "Co-Founder & Visionary",
      img: "/team/aanya.jpg"
    },
    {
      name: "Rohan Kapoor",
      role: "Product & Tech Lead",
      img: "/team/rohan.jpg"
    },
    {
      name: "Meera Nair",
      role: "Vendor Relations Manager",
      img: "/team/meera.jpg"
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Intro */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-purple-700 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About WedCo
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          WedCo was founded with one mission: to turn wedding chaos into celebration.
          We’re a passionate team of dreamers, designers, and doers.
        </motion.p>
      </section>

      {/* Mission */}
      <section className="bg-pink-50 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-2xl font-bold text-purple-600 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            To make every couple’s wedding planning journey stress-free, inspiring, and fun
            — by combining powerful tools with a human touch.
          </motion.p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-12">
            What We Believe In
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="font-semibold text-xl text-purple-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-purple-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-8">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg p-6 shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h4 className="font-semibold text-purple-800">{member.name}</h4>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <motion.h2
          className="text-3xl font-bold text-purple-700 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Make Memories?
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join thousands of couples who trust WedCo for their big day.
        </motion.p>
        <motion.a
          href="/get-started"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Start Planning
        </motion.a>
      </section>
    </div>
  );
}
