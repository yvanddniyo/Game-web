export type ButtonProps = {
  id?: string;
  title: string;
  leftIcon?: React.ReactNode;
  containerClass: string;
};

export type BentoCardProps = {
  src: string;
  title: React.ReactNode;
  description: string;
  isCommingSoon?: boolean;
};

export type BentoTiltProps = {
  children: React.ReactNode;
  className: string;
};
