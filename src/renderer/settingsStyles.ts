import styled from 'styled-components'

export const SettingsContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: ${(props) => props.theme.spacing.xl};
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.md};
  }
`

export const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`

export const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme.border.medium};
  color: ${(props) => props.theme.text.primary};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.radius.md};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.base};
  transition: ${(props) => props.theme.transition.base};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background: ${(props) => props.theme.background.tertiary};
    border-color: ${(props) => props.theme.brand.teal};
    color: ${(props) => props.theme.brand.teal};
  }
`

export const SettingsTitle = styled.h1`
  color: ${(props) => props.theme.brand.yellow};
  font-size: ${(props) => props.theme.fontSize['3xl']};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  margin: 0;
`

export const SettingsSection = styled.section`
  background: ${(props) => props.theme.background.secondary};
  border: 1px solid ${(props) => props.theme.border.light};
  border-radius: ${(props) => props.theme.radius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`

export const SectionTitle = styled.h2`
  color: ${(props) => props.theme.text.primary};
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
  padding-bottom: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.border.light};
`

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md} 0;
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.md};
  }
`

export const SettingLabel = styled.div`
  color: ${(props) => props.theme.text.primary};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`

export const SettingDescription = styled.div`
  color: ${(props) => props.theme.text.muted};
  font-size: ${(props) => props.theme.fontSize.sm};
`

export const ActionButton = styled.button`
  background: ${(props) => props.theme.brand.green};
  color: ${(props) => props.theme.text.inverse};
  border: none;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.radius.md};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  transition: ${(props) => props.theme.transition.base};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.success[600]};
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadow.md};
  }

  &:active {
    transform: translateY(0);
  }
`

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`

export const FAQItem = styled.div`
  background: ${(props) => props.theme.background.tertiary};
  border: 1px solid ${(props) => props.theme.border.light};
  border-radius: ${(props) => props.theme.radius.md};
  padding: ${(props) => props.theme.spacing.lg};
`

export const FAQQuestion = styled.h3`
  color: ${(props) => props.theme.text.primary};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`

export const FAQAnswer = styled.div`
  color: ${(props) => props.theme.text.secondary};
  font-size: ${(props) => props.theme.fontSize.base};
  line-height: 1.6;

  ul {
    margin: ${(props) => props.theme.spacing.md} 0;
    padding-left: ${(props) => props.theme.spacing.lg};
  }

  li {
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }

  strong {
    color: ${(props) => props.theme.text.primary};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
  }

  p {
    margin-top: ${(props) => props.theme.spacing.md};
  }

  a {
    color: ${(props) => props.theme.brand.teal};
    text-decoration: none;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    transition: ${(props) => props.theme.transition.base};

    &:hover {
      color: ${(props) => props.theme.primary[400]};
      text-decoration: underline;
    }
  }
`
