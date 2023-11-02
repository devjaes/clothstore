import Container from "@/components/ui/container";
import GridBillboard from "@/components/ui/grid-billboard";

const About = () => {
  return (
    <Container>
      <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
        <GridBillboard />
      </div>
    </Container>
  );
};

export default About;
