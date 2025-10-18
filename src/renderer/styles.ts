import styled from 'styled-components'

export const AppContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background.darkGradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.lg};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.md};
  }
`

export const SettingsLink = styled.button`
  position: fixed;
  top: ${(props) => props.theme.spacing.lg};
  right: ${(props) => props.theme.spacing.lg};
  background: transparent;
  border: none;
  color: ${(props) => props.theme.brand.yellow};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-decoration: underline;
  transition: ${(props) => props.theme.transition.base};
  z-index: 100;
  padding: ${(props) => props.theme.spacing.sm};

  &:hover {
    color: ${(props) => props.theme.secondary[400]};
    text-decoration: none;
  }

  &:active {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    top: ${(props) => props.theme.spacing.md};
    right: ${(props) => props.theme.spacing.md};
  }
`

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 50%;
`

export const Title = styled.h1`
  color: ${(props) => props.theme.brand.yellow};
  font-size: ${(props) => props.theme.fontSize['4xl']};
  font-weight: ${(props) => props.theme.fontWeight.light};
  margin-bottom: ${(props) => props.theme.spacing.md};
  letter-spacing: 2px;
  text-align: center;
`

export const Subtitle = styled.p`
  color: ${(props) => props.theme.text.primary};
  font-size: ${(props) => props.theme.fontSize.lg};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  text-align: center;
  opacity: 0.8;
`

export const SmallText = styled.span`
  color: ${(props) => props.theme.text.primary};
  font-size: ${(props) => props.theme.fontSize.base};
  text-align: center;
  opacity: 0.8;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 1rem;
  }
`

export const InputLabel = styled.label`
  color: #f4d03f;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`

export const CommandInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 1rem;
  border: 2px solid #444;
  border-radius: 8px;
  background: #333;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;

  &:focus {
    border-color: #f4d03f;
    box-shadow: 0 0 10px rgba(244, 208, 63, 0.3);
  }

  &::placeholder {
    color: #888;
  }
`

export const ExecuteButton = styled.button`
  background: #f4d03f;
  color: #1a1a1a;
  border: none;
  padding: 15px 40px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #f7dc6f;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(244, 208, 63, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const StatusMessage = styled.div<{
  $type: 'success' | 'error' | 'info'
}>`
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.radius.md};
  font-size: ${(props) => props.theme.fontSize.base};
  text-align: center;
  max-width: 100%;
  word-wrap: break-word;
  transition: ${(props) => props.theme.transition.base};

  ${(props) => {
    switch (props.$type) {
      case 'success':
        return `
          background: rgba(0, 149, 70, 0.15);
          color: ${props.theme.success[500]};
          border: 1px solid ${props.theme.success[500]};
        `
      case 'error':
        return `
          background: rgba(220, 30, 30, 0.15);
          color: ${props.theme.error[500]};
          border: 1px solid ${props.theme.error[500]};
        `
      case 'info':
        return `
          background: rgba(0, 144, 227, 0.15);
          color: ${props.theme.information[500]};
          border: 1px solid ${props.theme.information[500]};
        `
    }
  }}
`

export const SupportedCommands = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #444;
  width: 100%;
  max-width: 800px;
`

export const SupportedCommandsTitle = styled.h3`
  color: #f4d03f;
  margin: 0 0 10px 0;
  font-size: 1rem;
`

export const CommandList = styled.ul`
  color: #ccc;
  margin: 0;
  padding-left: 20px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;

  li {
    margin-bottom: 5px;
  }

  code {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 3px;
    color: #f4d03f;
  }
`

export const PredefinedCommandsContainer = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #444;
`

export const PredefinedCommandsTitle = styled.h3`
  color: #f4d03f;
  margin: 0 0 15px 0;
  font-size: 1rem;
`

export const PredefinedButtonsRow = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`

export const PredefinedCommandButton = styled.button`
  background: rgba(244, 208, 63, 0.2);
  color: #f4d03f;
  border: 1px solid #f4d03f;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  min-width: 80px;

  &:hover {
    background: rgba(244, 208, 63, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(244, 208, 63, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(102, 102, 102, 0.2);
    color: #666;
    border-color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const SpecialCommandsContainer = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  border: 1px solid #3498db;
  width: 100%;
  max-width: 800px;
`

export const SpecialCommandsTitle = styled.h3`
  color: #3498db;
  margin: 0 0 15px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '🔧';
    font-size: 1.2rem;
  }
`

export const SpecialDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin: 10px 0 20px 0;
  text-align: center;
  font-style: italic;
`

export const SpecialButtonsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 10px;
  }
`

export const CommandFlowItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
`

export const FlowArrow = styled.div`
  color: #888;
  font-size: 1.2rem;
  margin: 8px 0;

  &::before {
    content: '↓';
  }
`

export const SpecialCommandButton = styled.button<{ $completed?: boolean }>`
  background: ${(props) =>
    props.$completed ? 'rgba(0, 149, 70, 0.15)' : `rgba(29, 102, 107, 0.2)`};
  color: ${(props) =>
    props.$completed ? props.theme.success[500] : props.theme.brand.teal};
  border: 1px solid
    ${(props) =>
      props.$completed ? props.theme.success[500] : props.theme.brand.teal};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  border-radius: ${(props) => props.theme.radius.md};
  cursor: pointer;
  transition: ${(props) => props.theme.transition.base};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-align: center;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) =>
      props.$completed ? 'rgba(0, 149, 70, 0.25)' : 'rgba(29, 102, 107, 0.3)'};
    transform: translateY(-1px);
    box-shadow: ${(props) =>
      props.$completed
        ? props.theme.shadow.md
        : `0 3px 10px rgba(29, 102, 107, 0.3)`};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(102, 102, 102, 0.2);
    color: ${(props) => props.theme.neutral[500]};
    border-color: ${(props) => props.theme.neutral[500]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const RecipeSwapContainer = styled.div<{ $enabled: boolean }>`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 8px;
  border: 1px solid #2ecc71;
  opacity: ${(props) => (props.$enabled ? 1 : 0.5)};
  transition: opacity 0.3s ease;
  width: 100%;
  max-width: 800px;
`

export const RecipeSwapTitle = styled.h3`
  color: ${(props) => props.theme.brand.green};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
  font-size: ${(props) => props.theme.fontSize.base};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  &::before {
    content: '🔄';
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`

export const RecipeSwapButton = styled.button`
  background: rgba(0, 149, 70, 0.15);
  color: ${(props) => props.theme.brand.green};
  border: 1px solid ${(props) => props.theme.brand.green};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  border-radius: ${(props) => props.theme.radius.md};
  cursor: pointer;
  transition: ${(props) => props.theme.transition.base};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: rgba(0, 149, 70, 0.25);
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadow.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(102, 102, 102, 0.2);
    color: #666;
    border-color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const CsvInfoText = styled.div`
  margin-top: 1rem;
  padding: 10px 15px;
  font-size: 0.9rem;
  text-align: center;
  color: #a0a0a0;
  font-style: italic;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border-left: 3px solid #4a9eff;
`

export const AuthenticationMessage = styled.div`
  margin-top: 1rem;
  padding: 15px 20px;
  border-radius: 6px;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  border: 1px solid #2ecc71;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const RecipeInputsContainer = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #444;
  width: 100%;
  max-width: 800px;
`

export const RecipeInputsTitle = styled.h3`
  color: #f4d03f;
  margin: 0 0 20px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '⚙️';
    font-size: 1.2rem;
  }
`

export const MultiWeekCheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1.1rem;
  color: #4a9eff;
  font-weight: 500;
  padding: 12px 15px;
  background: rgba(74, 158, 255, 0.1);
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 158, 255, 0.15);
    border-color: rgba(74, 158, 255, 0.3);
  }

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    cursor: pointer;
    accent-color: #4a9eff;
  }
`

export const InputsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const InputGroupLabel = styled.label`
  color: #f4d03f;
  font-size: 0.9rem;
  font-weight: 500;
`

export const RecipeInput = styled.input`
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 2px solid #444;
  border-radius: 6px;
  background: #333;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;

  &:focus {
    border-color: #f4d03f;
    box-shadow: 0 0 8px rgba(244, 208, 63, 0.3);
  }

  &::placeholder {
    color: #888;
    font-style: italic;
  }
`

// Modal Components
export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const ModalContent = styled.div`
  background: ${(props) => props.theme.background.secondary};
  border: 2px solid ${(props) => props.theme.brand.yellow};
  border-radius: ${(props) => props.theme.radius.xl};
  padding: ${(props) => props.theme.spacing.xxl};
  max-width: 600px;
  width: 90%;
  box-shadow: ${(props) => props.theme.shadow.xl};
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.xl};
    max-width: 95%;
  }
`

export const ModalTitle = styled.h2`
  color: ${(props) => props.theme.brand.yellow};
  font-size: ${(props) => props.theme.fontSize['2xl']};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
`

export const ModalText = styled.p`
  color: ${(props) => props.theme.text.primary};
  font-size: ${(props) => props.theme.fontSize.base};
  line-height: 1.6;
  margin-bottom: ${(props) => props.theme.spacing.lg};

  strong {
    color: ${(props) => props.theme.brand.yellow};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
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

export const ModalButton = styled.button`
  background: ${(props) => props.theme.brand.yellow};
  color: ${(props) => props.theme.neutral[800]};
  border: none;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.xl};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  border-radius: ${(props) => props.theme.radius.md};
  cursor: pointer;
  transition: ${(props) => props.theme.transition.base};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background: ${(props) => props.theme.secondary[400]};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadow.lg};
  }

  &:active {
    transform: translateY(0);
  }
`
