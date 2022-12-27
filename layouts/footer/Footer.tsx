/* eslint-disable @next/next/no-img-element */
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import useGetTranslation from 'hooks/i18n/useGetTranslation';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = router.pathname;
  const isSearchPage = pathname.includes('search');
  const t = useGetTranslation();
  const { legalInformation, information, images } = useBrandConfig() || {};
  const { partnerName, corporateLink } = information || {};
  const showPartner = partnerName?.toLowerCase() !== 'simplenight';
  const {
    simplenightTermsOfService,
    simplenightPrivacyPolicy,
    partnerTermsOfService,
    partnerPrivacyPolicy,
  } = legalInformation || {};
  const { logo } = images || {};

  const simplenightCorporateLink = 'https://simplenight.com';

  const termsOfServiceText = t({ translationKey: 'termsOfService' });
  const privacyPolicyText = t({ translationKey: 'privacyPolicy' });
  const poweredByText = t({ translationKey: 'poweredBy', value: 'Powered by' });

  return (
    <footer
      className={classNames(
        'bg-dark-200 text-dark-1000 p-4 w-full text-center text-sm lg:px-24 lg:py-9',
        {
          'hidden lg:block': isSearchPage,
        },
      )}
    >
      <section className="mx-auto max-w-7xl lg:flex lg:justify-between">
        <section className="font-normal lg:text-left">
          <img
            src={logo}
            alt="Branch Logo"
            width="156px"
            height="60px"
            className="mx-auto lg:mx-0 object-fit"
          />
          <p className="font-semibold pt-3 text-[12px] lg:mt-2 uppercase">
            {poweredByText}{' '}
            {showPartner && (
              <>
                <ExternalLink
                  href={corporateLink}
                  className=" uppercase font-semibold underline hover:underline focus:underline focus:text-primary-1000 hover:text-primary-1000 "
                >
                  {partnerName}
                </ExternalLink>{' '}
                &{' '}
              </>
            )}
            <ExternalLink
              href={simplenightCorporateLink}
              className=" uppercase font-semibold underline hover:underline focus:underline focus:text-primary-1000 hover:text-primary-1000 "
            >
              Simplenight
            </ExternalLink>{' '}
          </p>
          <p className="hidden pt-[30px] font-normal capitalize lg:mt-8 lg:block lg:text-xs">
            {' '}
            © {currentYear} {partnerName}{' '}
          </p>
        </section>
        <div className="h-[1px] bg-dark-300 my-6 lg:hidden" />
        <section className="flex flex-col gap-3 text-xs underline capitalize lg:flex-row lg:gap-8 lg:text-right">
          <section className="flex flex-col gap-3 lg:gap-2">
            <ExternalLink
              href={simplenightTermsOfService}
              className="font-semibold underline hover:underline focus:underline focus:text-primary-1000 hover:text-primary-1000"
            >
              Simplenight {termsOfServiceText}
            </ExternalLink>
            <ExternalLink
              href={simplenightPrivacyPolicy}
              className="font-semibold underline hover:underline focus:underline focus:text-primary-1000 hover:text-primary-1000"
            >
              Simplenight {privacyPolicyText}
            </ExternalLink>
          </section>
        </section>
        <p className="pt-6 pb-2 lg:hidden">
          {' '}
          © {currentYear} {partnerName}{' '}
        </p>
      </section>
    </footer>
  );
};

const FooterBrandingHoc = () => {
  return (
    <BrandingHOC brand="" path={'layout/Footer'}>
      <Footer />
    </BrandingHOC>
  );
};

export default FooterBrandingHoc;
